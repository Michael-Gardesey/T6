/**
 * DateTime Utility Class
 * Manages UTC time display and formatting
 */
class DateTimeManager {
    constructor() {
        this.currentDateTime = "2025-06-19 05:53:19";
        this.currentUser = "Michael-Gardesey";
        this.elements = {
            container: null,
            date: null,
            time: null,
            user: null
        };
    }

    /**
     * Initialize the datetime display
     * @returns {void}
     */
    initialize() {
        // Create and inject HTML structure
        this.createTimeDisplay();
        
        // Initialize update interval
        this.startTimeUpdate();
        
        // Add event listeners
        this.addEventListeners();
    }

    /**
     * Create and inject the time display HTML
     * @returns {void}
     */
    createTimeDisplay() {
        const html = `
            <div class="utc-display">
                <div class="time-container">
                    <div class="display-label">UTC TIME</div>
                    <div class="time-value">
                        <span class="date-segment"></span>
                        <span class="separator">•</span>
                        <span class="time-segment"></span>
                    </div>
                </div>
                <div class="user-container">
                    <i class="fas fa-user-circle"></i>
                    <span class="user-value"></span>
                    <span class="status-indicator">
                        <span class="status-dot"></span>
                        <span class="status-text">ACTIVE</span>
                    </span>
                </div>
            </div>
        `;

        // Create container element
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.insertBefore(container.firstChild, document.body.firstChild);

        // Store element references
        this.elements.container = document.querySelector('.utc-display');
        this.elements.date = document.querySelector('.date-segment');
        this.elements.time = document.querySelector('.time-segment');
        this.elements.user = document.querySelector('.user-value');

        // Add styles
        this.addStyles();
    }

    /**
     * Start automatic time updates
     * @returns {void}
     */
    startTimeUpdate() {
        // Update immediately
        this.updateDisplay();

        // Update every second
        setInterval(() => {
            const now = new Date();
            this.currentDateTime = now.toISOString()
                .replace('T', ' ')
                .substring(0, 19);
            this.updateDisplay();
        }, 1000);
    }

    /**
     * Update the display elements
     * @returns {void}
     */
    updateDisplay() {
        const [date, time] = this.currentDateTime.split(' ');
        
        if (this.elements.date) {
            this.elements.date.textContent = date;
        }
        if (this.elements.time) {
            this.elements.time.textContent = time;
        }
        if (this.elements.user) {
            this.elements.user.textContent = this.currentUser;
        }
    }

    /**
     * Add event listeners for interactivity
     * @returns {void}
     */
    addEventListeners() {
        // Copy time to clipboard on click
        this.elements.container?.addEventListener('click', () => {
            navigator.clipboard.writeText(this.currentDateTime)
                .then(() => this.showNotification('Time copied to clipboard'));
        });
    }

    /**
     * Show notification message
     * @param {string} message - Message to display
     * @returns {void}
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'time-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => notification.remove(), 2000);
    }

    /**
     * Add required styles to document
     * @returns {void}
     */
    addStyles() {
        const styles = `
            .utc-display {
                position: fixed;
                top: 2rem;
                left: 2rem;
                z-index: 1000;
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(0, 246, 255, 0.2);
                border-radius: 12px;
                padding: 1.5rem;
                font-family: 'JetBrains Mono', monospace;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            }

            .utc-display:hover {
                border-color: rgba
