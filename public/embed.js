// public/embed.js
(function() {
    // LalaForms namespace
    window.LalaForms = window.LalaForms || {};
    
    // Base URL
    const baseUrl = 'https://forms.lalaforms.com';
    
    // Initialize popup
    LalaForms.initPopup = function(options) {
      const { formId, width, height, position } = options;
      
      // Create popup container if not exists
      let container = document.getElementById('lalaforms-popup-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'lalaforms-popup-container';
        container.style.display = 'none';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        container.style.zIndex = '9999';
        container.style.overflow = 'auto';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.style.color = '#fff';
        closeButton.onclick = function() {
          container.style.display = 'none';
        };
        
        container.appendChild(closeButton);
        
        // Create iframe container
        const iframeContainer = document.createElement('div');
        iframeContainer.style.width = width || '600px';
        iframeContainer.style.height = height || '80%';
        iframeContainer.style.margin = '40px auto';
        iframeContainer.style.backgroundColor = '#fff';
        iframeContainer.style.borderRadius = '8px';
        iframeContainer.style.overflow = 'hidden';
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `${baseUrl}/embed/${formId}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        iframeContainer.appendChild(iframe);
        container.appendChild(iframeContainer);
        document.body.appendChild(container);
      }
    };
    
    // Open popup
    LalaForms.openPopup = function(formId) {
      const container = document.getElementById('lalaforms-popup-container');
      if (container) {
        container.style.display = 'block';
      }
    };
    
    // Render form in container
    LalaForms.renderForm = function(options) {
      const { formId, container } = options;
      
      const containerEl = document.querySelector(container);
      if (!containerEl) {
        console.error(`Container ${container} not found`);
        return;
      }
      
      const iframe = document.createElement('iframe');
      iframe.src = `${baseUrl}/embed/${formId}`;
      iframe.style.width = '100%';
      iframe.style.height = '500px';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      
      // Auto-resize iframe based on content
      iframe.onload = function() {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
      };
      
      containerEl.appendChild(iframe);
    };
  })();