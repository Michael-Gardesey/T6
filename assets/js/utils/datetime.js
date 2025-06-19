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
                border-color: rgba(0, 246, 255, 0.4);
                box-shadow: 0 8px 32px rgba(0, 246, 255, 0.1);
            }

            .time-container {
                margin-bottom: 1rem;
            }

            .display-label {
                font-size: 0.7rem;
                color: #00f6ff;
                margin-bottom: 0.5rem;
                letter-spacing: 1px;
            }

            .time-value {
                font-size: 1.2rem;
                color: #00f6ff;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                text-shadow: 0 0 10px rgba(0, 246, 255, 0.3);
            }

            .separator {
                color: rgba(255, 255, 255, 0.5);
                animation: pulse 2s infinite;
            }

            .user-container {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(0, 246, 255, 0.1);
            }

            .user-container i {
                color: #00f6ff;
                font-size: 1.2rem;
            }

            .user-value {
                font-size: 0.9rem;
                opacity: 0.8;
            }

            .status-indicator {
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background: #00f6ff;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            .status-text {
                font-size: 0.7rem;
                color: #00f6ff;
                letter-spacing: 1px;
            }

            .time-notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                padding: 1rem 2rem;
                background: rgba(0, 246, 255, 0.1);
                border: 1px solid rgba(0, 246, 255, 0.2);
                border-radius: 8px;
                color: #fff;
                font-family: 'JetBrains Mono', monospace;
                animation: fadeInOut 2s ease-in-out;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }

            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(20px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }

            @media (max-width: 768px) {
                .utc-display {
                    left: 1rem;
                    right: 1rem;
                    top: 1rem;
                }

                .time-value {
                    font-size: 1rem;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const timeManager = new DateTimeManager();
    timeManager.initialize();
});
