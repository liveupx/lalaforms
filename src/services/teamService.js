// src/services/teamService.js
import { 
    collection, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    arrayUnion, 
    arrayRemove,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../firebase/config';
  import { sendTeamInvitation } from './emailService';
  
  // Create a new team
  export const createTeam = async (userId, teamData) => {
    try {
      const teamRef = await addDoc(collection(db, 'teams'), {
        name: teamData.name,
        ownerId: userId,
        createdAt: serverTimestamp(),
        members: [
          {
            userId,
            role: 'owner',
            joinedAt: serverTimestamp()
          }
        ]
      });
      
      return { id: teamRef.id };
    } catch (error) {
      throw error;
    }
  };
  
  // Get team by ID
  export const getTeamById = async (teamId) => {
    try {
      const teamDoc = await getDoc(doc(db, 'teams', teamId));
      if (!teamDoc.exists()) {
        throw new Error('Team not found');
      }
      return { id: teamDoc.id, ...teamDoc.data() };
    } catch (error) {
      throw error;
    }
  };
  
  // Get user's teams
  export const getUserTeams = async (userId) => {
    try {
      const teamsQuery = query(
        collection(db, 'teams'),
        where('members', 'array-contains', { userId, role: { $in: ['owner', 'admin', 'member'] } })
      );
      
      const querySnapshot = await getDocs(teamsQuery);
      const teams = [];
      
      querySnapshot.forEach((doc) => {
        teams.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return teams;
    } catch (error) {
      throw error;
    }
  };
  
  // Update team
  export const updateTeam = async (teamId, teamData) => {
    try {
      await updateDoc(doc(db, 'teams', teamId), {
        name: teamData.name
      });
      return { id: teamId };
    } catch (error) {
      throw error;
    }
  };
  
  // Delete team
  export const deleteTeam = async (teamId) => {
    try {
      await deleteDoc(doc(db, 'teams', teamId));
      return { success: true };
    } catch (error) {
      throw error;
    }
  };
  
  // Invite user to team
  export const inviteUserToTeam = async (teamId, inviterUserId, inviteeEmail) => {
    try {
      // Get inviter's name
      const inviterDoc = await getDoc(doc(db, 'users', inviterUserId));
      if (!inviterDoc.exists()) {
        throw new Error('Inviter not found');
      }
      
      const inviterName = inviterDoc.data().displayName || 'A team member';
      
      // Send invitation email
      await sendTeamInvitation(teamId, inviteeEmail, inviterName);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };
  
  // Accept team invitation
  export const acceptTeamInvitation = async (tokenId, userId) => {
    try {
      // Get token document
      const tokenDoc = await getDoc(doc(db, 'tokens', tokenId));
      if (!tokenDoc.exists()) {
        throw new Error('Invitation not found or has expired');
      }
      
      const tokenData = tokenDoc.data();
      
      // Check if token is valid and not expired
      if (tokenData.type !== 'team-invitation' || 
          tokenData.expiresAt.toDate() < new Date()) {
        throw new Error('Invitation not found or has expired');
      }
      
      // Get user email
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userEmail = userDoc.data().email;
      
      // Check if invitation was for this user
      if (tokenData.email !== userEmail) {
        throw new Error('Invitation was not sent to your email address');
      }
      
      // Add user to team
      await updateDoc(doc(db, 'teams', tokenData.teamId), {
        members: arrayUnion({
          userId,
          role: 'member',
          joinedAt: serverTimestamp()
        })
      });
      
      // Delete token
      await deleteDoc(doc(db, 'tokens', tokenId));
      
      return { teamId: tokenData.teamId };
    } catch (error) {
      throw error;
    }
  };
  
  // Remove member from team
  export const removeTeamMember = async (teamId, memberUserId) => {
    try {
      // Get team document to check members
      const teamDoc = await getDoc(doc(db, 'teams', teamId));
      if (!teamDoc.exists()) {
        throw new Error('Team not found');
      }
      
      const teamData = teamDoc.data();
      
      // Find member object
      const memberToRemove = teamData.members.find(member => member.userId === memberUserId);
      
      if (!memberToRemove) {
        throw new Error('Member not found in team');
      }
      
      // Remove member
      await updateDoc(doc(db, 'teams', teamId), {
        members: arrayRemove(memberToRemove)
      });
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };
  
  // Update member role
  export const updateMemberRole = async (teamId, memberUserId, newRole) => {
    try {
      // Get team document to check members
      const teamDoc = await getDoc(doc(db, 'teams', teamId));
      if (!teamDoc.exists()) {
        throw new Error('Team not found');
      }
      
      const teamData = teamDoc.data();
      
      // Find member index
      const memberIndex = teamData.members.findIndex(member => member.userId === memberUserId);
      
      if (memberIndex === -1) {
        throw new Error('Member not found in team');
      }
      
      // Remove old member object
      const memberToUpdate = teamData.members[memberIndex];
      
      await updateDoc(doc(db, 'teams', teamId), {
        members: arrayRemove(memberToUpdate)
      });
      
      // Add updated member object
      await updateDoc(doc(db, 'teams', teamId), {
        members: arrayUnion({
          ...memberToUpdate,
          role: newRole
        })
      });
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  };