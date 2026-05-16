/**
 * Premium Image Modal with Smooth Animations
 * Handles lightbox, zoom animations, gallery navigation, and swipe gestures
 * 
 * USAGE:
 * ------
 * 1. Add images to your project cards:
 *    <img src="path/to/image.jpg" alt="Project screenshot" />
 * 
 * 2. The modal automatically detects and makes clickable:
 *    - Images in .card elements
 *    - Any element with [data-modal-image] attribute
 * 
 * 3. Features:
 *    - Click to open smooth zoom modal
 *    - ESC to close
 *    - Arrow keys or swipe to navigate
 *    - Mobile-friendly touch gestures
 *    - Automatic gallery pagination
 *    - Keyboard shortcuts (←/→ arrows)
 * 
 * KEYBOARD SHORTCUTS:
 * - ESC: Close modal
 * - ←: Previous image
 * - →: Next image
 * 
 * TOUCH GESTURES:
 * - Swipe left: Next image
 * - Swipe right: Previous image
 * - Swipe down: Close modal
 */

/**
    // Create clone (we'll animate left/top/width/height to avoid transform-origin pitfalls)
    const clone = new Image();
    clone.src = src;
    clone.alt = alt || '';
    clone.className = 'image-modal-clone';
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.objectFit = 'contain';
    clone.style.opacity = '1';
    // no transforms; we'll animate geometry directly
    clone.style.transition = `left ${this.options.animationDuration}ms ${this.options.easing}, top ${this.options.animationDuration}ms ${this.options.easing}, width ${this.options.animationDuration}ms ${this.options.easing}, height ${this.options.animationDuration}ms ${this.options.easing}, opacity ${Math.round(this.options.animationDuration/2)}ms linear`;
    clone.style.willChange = 'left,top,width,height,opacity';
    clone.style.zIndex = '99999';
    // Flat, clean visual: remove any radius/shadow/filter
    clone.style.borderRadius = '0px';
    clone.style.boxShadow = 'none';
    clone.style.filter = 'none';
    document.body.appendChild(clone);

    // Hide original to create continuous illusion
    try { originEl.style.visibility = 'hidden'; } catch (e) {}

    this._clone = clone;
    this._originElement = originEl;
    this._originRect = rect;

    // Compute final size to nearly fill viewport (96vw x 96vh) while preserving aspect ratio
    const viewportMaxW = window.innerWidth * 0.96;
    const viewportMaxH = window.innerHeight * 0.96;
    const ratio = Math.min(viewportMaxW / rect.width, viewportMaxH / rect.height);
    // Boost for certificates/profile for more impact
    let finalRatio = ratio;
    try {
      const origin = this._originElement || originEl;
      const isCertBtn = origin && origin.classList && origin.classList.contains('image-modal-cert-btn');
      const isProfile = origin && origin.classList && origin.classList.contains('avatar');
      if (isCertBtn || isProfile) finalRatio = finalRatio * 1.18; // slightly larger
    } catch (e) {}
    // Cap to viewport and reasonable max
    finalRatio = Math.min(finalRatio, viewportMaxW / rect.width, viewportMaxH / rect.height, 3);

    const finalWidth = rect.width * finalRatio;
    const finalHeight = rect.height * finalRatio;
    const finalLeft = Math.round((window.innerWidth - finalWidth) / 2);
    const finalTop = Math.round((window.innerHeight - finalHeight) / 2);

    // Compute final scale (based on finalWidth) and translation deltas
    const startCenterX = rect.left + rect.width / 2;
    const startCenterY = rect.top + rect.height / 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = centerX - startCenterX;
    const deltaY = centerY - startCenterY;
    const finalScale = finalWidth / rect.width;

    // Start with no transform and invisible; then animate transform+opacity for smooth FLIP
    clone.style.transformOrigin = 'center center';
    // Chrome GPU/paint hints
    clone.style.transform = 'translate(0px, 0px) scale(1) translateZ(0)';
    clone.style.backfaceVisibility = 'hidden';
    clone.style.willChange = 'transform,opacity';
    clone.style.opacity = '0';
    clone.getBoundingClientRect();
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${finalScale})`;
      clone.style.opacity = '1';
    });

    this.isOpen = true;
    this.preventScroll();
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="image-modal-counter">
          <span id="modalCounter">1 / 1</span>
        </div>

        <div class="image-modal-info">
          <p id="modalCaption"></p>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'imageModalContainer';
    container.innerHTML = modalHTML;
    document.body.appendChild(container);
  }

  attachEventListeners() {
    const backdrop = document.getElementById('imageModalBackdrop');
    const closeBtn = document.querySelector('.image-modal-close');
    const prevBtn = document.querySelector('.image-modal-prev');
    const nextBtn = document.querySelector('.image-modal-next');
    const modal = document.getElementById('imageModal');
    const image = document.getElementById('modalImage');

    // Close modal
    backdrop.addEventListener('click', () => this.closeModal());
    closeBtn.addEventListener('click', () => this.closeModal());
    
    // Navigation
    prevBtn.addEventListener('click', () => this.previousImage());
    nextBtn.addEventListener('click', () => this.nextImage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'ArrowLeft') this.previousImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });

    // Touch/Swipe gestures
    modal.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    modal.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    modal.addEventListener('touchend', (e) => this.handleTouchEnd(e));

    // Prevent body scroll when modal is open
    this.preventScroll = () => {
      if (this.isOpen) {
        this.scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = -this.scrollY + 'px';
        document.body.classList.add('modal-open');
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.classList.remove('modal-open');
        window.scrollTo(0, this.scrollY);
      }
    };
  }

  scanForImages() {
    // Scan for clickable images in project cards
    const projectImages = document.querySelectorAll('.card img, [data-modal-image]');
    
    projectImages.forEach((img) => {
      // Skip avatar and certificate link images
      if (img.closest('.avatar-link') || img.closest('.card-footer')) return;
      
      const container = document.createElement('div');
      container.className = 'image-modal-trigger';
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);

      const triggerBtn = document.createElement('button');
      triggerBtn.className = 'image-modal-open-btn';
      triggerBtn.setAttribute('aria-label', 'View full image');
      triggerBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      `;
      
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openModal(img, container.parentElement);
      });

      container.appendChild(triggerBtn);
      
      // Store image data
      this.images.push({
        src: img.src,
        alt: img.alt,
        element: img,
        container: container
      });
    });

    // Handle profile picture (avatar)
    this.setupProfilePicture();

    // Handle certificates
    this.setupCertificates();

    // Add click listener to all images in modals
    this.images.forEach((img, index) => {
      img.element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openModal(img.element, img.container);
      });
    });
  }

  setupProfilePicture() {
    const avatarLink = document.querySelector('.avatar-link');
    const avatar = document.querySelector('.avatar');

    if (!avatar || !avatarLink) return;

    // Remove default link behavior
    avatarLink.href = '#';
    avatarLink.setAttribute('role', 'button');
    avatarLink.removeAttribute('target');
    avatarLink.removeAttribute('rel');

    // Create wrapper for animations
    const wrapper = document.createElement('div');
    wrapper.className = 'image-modal-profile-wrapper';
    avatar.parentNode.insertBefore(wrapper, avatar);
    wrapper.appendChild(avatar);

    // Add hover button
    const hoverBtn = document.createElement('button');
    hoverBtn.className = 'image-modal-profile-hover';
    hoverBtn.setAttribute('aria-label', 'View profile picture');
    hoverBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    `;

    wrapper.appendChild(hoverBtn);

    // Add floating animation to avatar
    avatar.classList.add('avatar-floating');

    // Handle click
    avatarLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.openModalForProfile(avatar, wrapper);
    });

    // Fallback: avatar image itself should also open the profile modal
    avatar.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('image-modal: avatar clicked');
      this.openModalForProfile(avatar, wrapper);
    });

    hoverBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openModalForProfile(avatar, wrapper);
    });

    // Store profile image
    this.profileImage = {
      src: avatar.src,
      alt: avatar.alt,
      element: avatar,
      container: wrapper,
      isProfile: true
    };
  }

  setupCertificates() {
    // Find certificate links in card footers
    const certificateLinks = document.querySelectorAll('.card-footer a[href*="certificate"]');

    if (!this.certificates) {
      this.certificates = [];
    }

    certificateLinks.forEach((link) => {
      const imageSrc = link.getAttribute('href');
      const certTitle = link.textContent.trim();
      
      // Create certificate card wrapper (minimal design)
      const certContainer = document.createElement('div');
      certContainer.className = 'image-modal-cert-wrapper';
      link.parentNode.insertBefore(certContainer, link);
      
      // Create title
      const title = document.createElement('h3');
      title.className = 'image-modal-cert-title';
      title.textContent = certTitle;
      certContainer.appendChild(title);

      // Create image element (hidden, only for modal)
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = link.getAttribute('aria-label') || 'Certificate';
      img.className = 'image-modal-cert-image';
      // Don't append to container - keep it hidden

      // Create view button (styled like repo link)
      const viewBtn = document.createElement('button');
      viewBtn.className = 'image-modal-cert-btn';
      viewBtn.textContent = 'View Certificate';
      viewBtn.setAttribute('aria-label', 'View certificate');
      certContainer.appendChild(viewBtn);

      // Handle click on view button or original link. Use the button as the visual origin
      const openCert = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Use the visible button as the origin rect for the zoom illusion
        this.openModalForCertificate(viewBtn, certContainer, imageSrc, img.alt);
      };

      viewBtn.addEventListener('click', openCert);
      link.addEventListener('click', openCert);

      // Hide original link
      link.style.display = 'none';

      // Store certificate
      this.certificates.push({
        src: imageSrc,
        alt: img.alt,
        element: img,
        container: certContainer,
        isCertificate: true
      });
    });
  }

  openModalForProfile(imageElement, container) {
    this.currentImageIndex = -1; // Special index for profile
    // Use the visible avatar element as the origin for the zoom
    const rect = imageElement.getBoundingClientRect();
    this.openFromElement(imageElement, imageElement.src, rect);
  }

  openModalForCertificate(imageElement, container, imageSrc, alt) {
    this.currentImageIndex = -2; // Special index for certificate
    // imageElement here may be the hidden img; use the visible container/button for origin
    const originRect = imageElement.getBoundingClientRect();
    this.openFromElement(imageElement, imageSrc, originRect, alt);
  }

  openModalWithAnimation(imageElement, container, rect, scrollY, overrideSrc, overrideAlt) {
    // Deprecated - use openFromElement for consistent FLIP-based animation
    // keep for backwards compatibility but forward to clone-based opener
    const src = overrideSrc || imageElement.src;
    this.openFromElement(imageElement, src, rect);
  }

  // FLIP-like open animation using a cloned element so the image appears to
  // physically scale and translate from its original location into center.
  openFromElement(originEl, src, originRect = null, alt = '') {
    const rect = originRect || originEl.getBoundingClientRect();
    const backdrop = document.getElementById('imageModalBackdrop');
    const container = document.getElementById('imageModalContainer');

    // Ensure container/backdrop visible
    container.style.display = 'flex';
    backdrop.style.transition = `opacity ${this.options.animationDuration}ms ${this.options.easing}`;
    backdrop.style.opacity = '0';

    // Create clone
    const clone = new Image();
    clone.src = src;
    clone.alt = alt || '';
    clone.className = 'image-modal-clone';
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.objectFit = 'contain';
    // Use transform+opacity for smooth FLIP animation (translate + scale)
    clone.style.transition = `transform ${this.options.animationDuration}ms ${this.options.easing}, opacity ${Math.round(this.options.animationDuration/2)}ms linear`;
    clone.style.willChange = 'transform,opacity';
    clone.style.zIndex = '99999';
    // Flat, clean visual: remove any radius/shadow/filter
    clone.style.borderRadius = '0px';
    clone.style.boxShadow = 'none';
    clone.style.filter = 'none';
    // Start invisible so the transition is visible when we change geometry
    clone.style.opacity = '0';
    document.body.appendChild(clone);

    // Hide original to create continuous illusion
    try { originEl.style.visibility = 'hidden'; } catch (e) {}

    this._clone = clone;
    this._originElement = originEl;
    this._originRect = rect;

    // Compute final geometry to nearly fill viewport (96vw x 96vh) while preserving aspect ratio
    const viewportMaxW = window.innerWidth * 0.96;
    const viewportMaxH = window.innerHeight * 0.96;
    const baseRatio = Math.min(viewportMaxW / rect.width, viewportMaxH / rect.height);
    // Boost for certificates/profile for more impact
    let finalRatio = baseRatio;
    try {
      const origin = this._originElement || originEl;
      const isCertBtn = origin && origin.classList && origin.classList.contains('image-modal-cert-btn');
      const isProfile = origin && origin.classList && origin.classList.contains('avatar');
      if (isCertBtn || isProfile) finalRatio = finalRatio * 1.18;
    } catch (e) {}
    // Cap final ratio to avoid extreme upscaling
    finalRatio = Math.min(finalRatio, viewportMaxW / rect.width, viewportMaxH / rect.height, 3);

    const finalWidth = rect.width * finalRatio;
    const finalHeight = rect.height * finalRatio;
    const finalLeft = Math.round((window.innerWidth - finalWidth) / 2);
    const finalTop = Math.round((window.innerHeight - finalHeight) / 2);

    // Compute final scale and translation, then animate via transform for a clean FLIP
    const startCenterX = rect.left + rect.width / 2;
    const startCenterY = rect.top + rect.height / 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = centerX - startCenterX;
    const deltaY = centerY - startCenterY;
    const finalScale = finalWidth / rect.width;

    // Start with identity transform and invisible, then animate to translated+scaled state
    clone.style.transformOrigin = 'center center';
    clone.style.transform = 'translate(0px, 0px) scale(1)';
    clone.style.opacity = '0';
    clone.getBoundingClientRect();
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${finalScale})`;
      clone.style.opacity = '1';
    });

    this.isOpen = true;
    this.preventScroll();
  }

  openModal(imageElement, container) {
    const imageIndex = this.images.findIndex(img => img.element === imageElement);
    this.currentImageIndex = imageIndex !== -1 ? imageIndex : 0;
    // Use FLIP clone-based open so the image itself animates from its thumbnail
    const rect = imageElement.getBoundingClientRect();
    const src = this.images[this.currentImageIndex].src;
    this.openFromElement(imageElement, src, rect, imageElement.alt || '');
  }

  closeModal() {
    if (!this.isOpen) return;

    const backdrop = document.getElementById('imageModalBackdrop');
    const container = document.getElementById('imageModalContainer');

    // If we used the clone-based FLIP animation, reverse it back to the origin
    if (this._clone) {
      const clone = this._clone;

      // Fade backdrop
      backdrop.style.transition = `opacity ${this.options.animationDuration}ms ${this.options.easing}`;
      backdrop.style.opacity = '0';

      // Animate clone back to its original transform (no translate/scale)
      try {
        clone.style.transition = `transform ${this.options.animationDuration}ms ${this.options.easing}, opacity ${Math.round(this.options.animationDuration/2)}ms linear`;
        // revert to identity transform (origin position/size)
        clone.style.transform = 'translate(0px, 0px) scale(1)';
        clone.style.opacity = '0';
      } catch (e) {
        clone.style.opacity = '0';
      }

      setTimeout(() => {
        try { if (this._originElement) this._originElement.style.visibility = ''; } catch (e) {}
        if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
        this._clone = null;
        this._originElement = null;
        this._originRect = null;
        container.style.display = 'none';
        this.isOpen = false;
        this.preventScroll();
      }, this.options.animationDuration + 40);

      return;
    }

    // Fallback to legacy modal close behavior
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    modal.style.opacity = '0';
    modal.style.transform = 'translate(-50%, -50%) scale(0.85)';
    backdrop.style.opacity = '0';
    modalImage.style.opacity = '0';
    modalImage.style.transform = 'scale(0.9)';

    setTimeout(() => {
      container.style.display = 'none';
      
      // Reset counter and nav visibility for next images
      if (this.currentImageIndex !== -1 && this.currentImageIndex !== -2) {
        document.querySelector('.image-modal-counter').style.display = 'block';
        document.querySelector('.image-modal-prev').style.display = 'block';
        document.querySelector('.image-modal-next').style.display = 'block';
      }
      
      this.isOpen = false;
      this.preventScroll();
    }, this.options.animationDuration);
  }

  nextImage() {
    // Disable navigation for profile/certificate
    if (this.images.length <= 1 || this.currentImageIndex === -1 || this.currentImageIndex === -2) return;

    const imageElement = document.getElementById('modalImage');
    
    // Fade out animation
    imageElement.style.opacity = '0';
    imageElement.style.transform = 'translateX(20px)';

    setTimeout(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      imageElement.src = this.images[this.currentImageIndex].src;
      imageElement.style.transform = 'translateX(-20px)';
      
      requestAnimationFrame(() => {
        imageElement.style.opacity = '1';
        imageElement.style.transform = 'translateX(0)';
      });

      this.updateCounter();
      this.updateNavigationButtons();
    }, 150);
  }

  previousImage() {
    // Disable navigation for profile/certificate
    if (this.images.length <= 1 || this.currentImageIndex === -1 || this.currentImageIndex === -2) return;

    const imageElement = document.getElementById('modalImage');
    
    // Fade out animation
    imageElement.style.opacity = '0';
    imageElement.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      imageElement.src = this.images[this.currentImageIndex].src;
      imageElement.style.transform = 'translateX(20px)';
      
      requestAnimationFrame(() => {
        imageElement.style.opacity = '1';
        imageElement.style.transform = 'translateX(0)';
      });

      this.updateCounter();
      this.updateNavigationButtons();
    }, 150);
  }

  updateCounter() {
    const counter = document.getElementById('modalCounter');
    counter.textContent = `${this.currentImageIndex + 1} / ${this.images.length}`;
  }

  updateNavigationButtons() {
    const prevBtn = document.querySelector('.image-modal-prev');
    const nextBtn = document.querySelector('.image-modal-next');

    if (this.images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    if (!this.touchStartX) return;
  }

  handleTouchEnd(e) {
    if (!this.touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - touchEndX;
    const diffY = this.touchStartY - touchEndY;

    // Swipe left - next image
    if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
      this.nextImage();
    }
    // Swipe right - previous image
    else if (Math.abs(diffX) > Math.abs(diffY) && diffX < -50) {
      this.previousImage();
    }
    // Swipe down - close modal
    else if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
      this.closeModal();
    }

    this.touchStartX = 0;
    this.touchStartY = 0;
  }
}

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', () => {
  window.imageModal = new ModernImageModal();
});
