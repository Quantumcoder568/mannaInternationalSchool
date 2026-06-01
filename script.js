
// Watch Headmaster's Video - Self-Hosted Version
const watchVideoBtn = document.getElementById('watchVideoBtn');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const schoolVideo = document.getElementById('schoolVideo');

function openVideoModal() {
    videoModal.style.display = 'flex';
    schoolVideo.play();
}

function closeVideoModalFunc() {
    videoModal.style.display = 'none';
    schoolVideo.pause();
    schoolVideo.currentTime = 0; // Reset to beginning
}

if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', openVideoModal);
}

if (closeVideoModal) {
    closeVideoModal.addEventListener('click', closeVideoModalFunc);
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModalFunc();
    }
});

// Optional: Stop video when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        closeVideoModalFunc();
    }
});





// Enhanced AI Chatbot Functionality
// ==================== ENHANCED AI CHATBOT WITH SMART CONTACT ESCALATION ====================
function initEnhancedChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMinimize = document.querySelector('.chatbot-minimize');
    const sendMessageBtn = document.getElementById('sendMessage');
    const voiceInputBtn = document.getElementById('voiceInput');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const typingIndicator = document.querySelector('.typing-indicator');
    const notificationDot = document.querySelector('.notification-dot');

    let isTyping = false;
    let awaitingContactResponse = false;
    let contactStep = 0;

    // Contact links (UPDATE THESE)
    const CONTACT_LINKS = {
        whatsapp: "https://wa.me/233123456789",   // Replace with your WhatsApp number
        email: "mailto:info@mannainternational.edu",
        telegram: "https://t.me/mannaintl"        // Replace with your Telegram username
    };

    // ========== INTENTS (improved with more categories) ==========
        const intents = {
        greeting: { keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy', 'sup'], responses: ["Hello! I'm Wisdom, your AI assistant at Manna International School. How can I help you today? 😊", "Hi there! Ask me about admissions, fees, programs, campus life – anything! 🎓"] },
        gratitude: { keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'thx'], responses: ["You're very welcome! 😊 Anything else?", "My pleasure! Feel free to ask anytime."] },
        affirmation: { keywords: ['ok', 'okay', 'cool', 'great', 'nice', 'awesome', 'got it'], responses: ["Awesome! Let me know if you need anything else.", "Great! I'm here whenever you have more questions."] },
        smalltalk: { keywords: ['how are you', 'how do you do', 'what\'s up', 'how\'s it going'], responses: ["I'm doing great, thanks! How can I help you today? 😊", "All good here! What can I do for you?"] },
        admissions: { keywords: ['admission', 'apply', 'application', 'enroll', 'enrollment', 'deadline', 'requirements', 'process', 'how to join', 'documents', 'interview', 'assessment', 'entrance exam', 'register'], responses: ["📝 **Admissions Process:** 1️⃣ Visit the school (no online forms, no fee) 2️⃣ Entrance assessment (Math & English) 3️⃣ Family interview & campus tour 4️⃣ Acceptance & enrollment. Need documents or fee info?"] },
        documents: { keywords: ['documents', 'paperwork', 'birth certificate', 'report card', 'immunization', 'photos', 'id card', 'requirements list'], responses: ["📋 **Required documents:** Birth certificate (or sworn declaration), previous school report (if any), immunization records, 2 passport photos, parent/guardian ID. Bring these when you visit."] },
        fees: { keywords: ['fees', 'tuition', 'cost', 'price', 'fee structure', 'how much', 'ghc', 'term fees'], responses: ["💰 **Tuition per term:** Creche–Class 1: GHC 200 | Class 2–6: GHC 400 | JHS 1–3: GHC 800. One‑time fees: Enrollment GHC 100, Technology GHC 100, Activities GHC 200. Financial aid available."] },
        scholarships: { keywords: ['scholarship', 'financial aid', 'discount', 'assistance', 'merit', 'need-based'], responses: ["🎓 Yes, we offer need‑based aid and merit scholarships. Visit our admissions office to apply."] },
        programs: { keywords: ['program', 'course', 'curriculum', 'subjects', 'offer', 'stem', 'humanities', 'class'], responses: ["📚 **Core subjects:** English, Maths, Science, Social Studies, ICT, French, RME, Creative Arts, PE. Plus science labs, ICT with coding/robotics. Want club info too?"] },
        clubs: { keywords: ['club', 'activity', 'extracurricular', 'sports', 'debate', 'reading', 'coding', 'robotics', 'eco', 'creative arts', 'football'], responses: ["🎉 **Clubs:** Reading, Debate, Sports (football/athletics), Creative Arts, Eco, Coding & Robotics. All students are encouraged to join!"] },
        bece: { keywords: ['bece', 'results', 'exam performance', 'pass rate', 'aggregate', 'top student'], responses: ["🏆 **BECE Excellence:** 100% pass rate (2022–24). 89% A‑C in English, 92% in Maths, 85% in Science. Top performer 2024: Aggregate 6, placed in Prempeh College."] },
        campus: { keywords: ['campus', 'facility', 'library', 'lab', 'pool', 'auditorium', 'dining', 'sports field'], responses: ["🏫 **Facilities:** Modern library, computer labs, science lab, sports complex, art studio, dining hall. Schedule a tour!"] },
        studentLife: { keywords: ['student life', 'events', 'sports day', 'science fair', 'field trips', 'competitions'], responses: ["🎊 **Student Life:** Annual Sports Day, Science Fair, drama productions, field trips, inter‑house debates, art exhibitions. Always something exciting!"] },
        achievements: { keywords: ['achievement', 'award', 'recognition', 'blue ribbon', 'ges award', 'stem award', 'green school'], responses: ["🏅 **Recognitions:** Best Private School – Eastern Region (GES 2023), NAGRAT STEM Excellence Award, Green School Certification, Community Impact Award."] },
        contact: { keywords: ['contact', 'address', 'location', 'phone', 'email', 'where are you', 'bremang'], responses: ["📍 **Contact:** Bremang U.G.C. | 📞 +233 547 408 695 | ✉️ info@manna.edu.gh | Mon-Fri 8am–5pm"] },
        faq: { keywords: ['faq', 'frequently asked', 'common questions', 'tell me about', 'what is'], responses: ["Common questions: Student‑teacher ratio 15:1 | School hours 8am‑3pm (after‑school till 6pm) | Bus service available (fees apply) | Uniform required."] },
        goodbye: { keywords: ['bye', 'goodbye', 'see you', 'exit', 'quit', 'later'], responses: ["Goodbye! Have a wonderful day! 👋", "Take care! Feel free to return anytime."] }
    };

    // Helper: get intent from user message (prioritizes shorter matches)
    function getIntent(message) {
        const lowerMsg = message.toLowerCase().trim();
        // First, check for empty/very short messages
        if (lowerMsg.length === 0) return 'greeting';
        
        for (const [intent, data] of Object.entries(intents)) {
            if (data.keywords && data.keywords.some(keyword => lowerMsg.includes(keyword))) {
                return intent;
            }
        }
        return 'unknown';
    }

    // Generate response for known intents
    function generateKnownResponse(intent) {
        const intentData = intents[intent];
        if (intentData && intentData.responses) {
            return intentData.responses[Math.floor(Math.random() * intentData.responses.length)];
        }
        return null;
    }

    // Contact escalation flow (only called for truly unknown questions)
    async function processContactFlow(message) {
        const lowerMsg = message.toLowerCase().trim();
        
        if (contactStep === 0) {
            addMessage("I don't have an answer for that. Would you like to contact the school administration directly? (Please say **yes** or **no**)", 'bot');
            awaitingContactResponse = true;
            contactStep = 1;
            return;
        }
        
        if (contactStep === 1) {
            if (lowerMsg === 'yes' || lowerMsg === 'y' || lowerMsg === 'sure' || lowerMsg === 'ok') {
                addMessage("Great! How would you like to reach us?\n\n• **WhatsApp**\n• **Email**\n• **Telegram**\n\nJust type the platform name.", 'bot');
                contactStep = 2;
            } else if (lowerMsg === 'no' || lowerMsg === 'n' || lowerMsg === 'not now') {
                addMessage("No problem! You can ask me something else about Manna International School – admissions, programs, campus, or achievements. What would you like to know? 😊", 'bot');
                resetContactFlow();
            } else {
                addMessage("Please answer **yes** or **no**. Would you like to contact the school administration?", 'bot');
            }
            return;
        }
        
        if (contactStep === 2) {
            if (lowerMsg.includes('whatsapp')) {
                addMessage("Redirecting you to WhatsApp... 📱", 'bot');
                setTimeout(() => {
                    window.open(CONTACT_LINKS.whatsapp, '_blank');
                }, 1000);
                resetContactFlow();
            } else if (lowerMsg.includes('email')) {
                addMessage("Opening your email app... 📧", 'bot');
                setTimeout(() => {
                    window.location.href = CONTACT_LINKS.email;
                }, 1000);
                resetContactFlow();
            } else if (lowerMsg.includes('telegram')) {
                addMessage("Redirecting you to Telegram... 💬", 'bot');
                setTimeout(() => {
                    window.open(CONTACT_LINKS.telegram, '_blank');
                }, 1000);
                resetContactFlow();
            } else {
                addMessage("Please choose one of: **WhatsApp**, **Email**, or **Telegram**.", 'bot');
            }
            return;
        }
    }

    function resetContactFlow() {
        awaitingContactResponse = false;
        contactStep = 0;
    }

    // Main message processor
    async function processMessage(message) {
        showTypingIndicator();
        const processingTime = 400 + Math.random() * 800; // faster responses
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // If we're in contact flow, handle specially
            if (awaitingContactResponse || contactStep > 0) {
                processContactFlow(message);
                return;
            }
            
            const intent = getIntent(message);
            
            if (intent === 'unknown') {
                // Only unknown real questions trigger contact escalation
                processContactFlow(message);
            } else {
                // Known intent – give normal response
                const response = generateKnownResponse(intent);
                if (response) {
                    addMessage(response, 'bot');
                } else {
                    // Fallback (should never happen)
                    addMessage("I'm here to help with Manna International School. What would you like to know?", 'bot');
                }
                updateSuggestions(intent);
            }
        }, processingTime);
    }

    // Update suggestion chips based on last intent
    function updateSuggestions(lastIntent) {
        const suggestionsContainer = document.querySelector('.suggestion-chips');
        if (!suggestionsContainer) return;
        let suggestions = [];
        switch (lastIntent) {
            case 'admissions':
                suggestions = [
                    { question: "What documents are required?", text: "Required Documents" },
                    { question: "When are the deadlines?", text: "Deadlines" },
                    { question: "How much is the application fee?", text: "Application Fee" }
                ];
                break;
            case 'tuition':
                suggestions = [
                    { question: "Do you offer scholarships?", text: "Scholarships" },
                    { question: "Can I pay in installments?", text: "Payment Plans" }
                ];
                break;
            case 'programs':
                suggestions = [
                    { question: "Tell me about STEM", text: "STEM Details" },
                    { question: "What arts programs are available?", text: "Arts Programs" }
                ];
                break;
            default:
                suggestions = [
                    { question: "What's the application deadline?", text: "Deadline" },
                    { question: "Do you offer scholarships?", text: "Scholarships" },
                    { question: "Contact school", text: "Contact Us" }
                ];
        }
        suggestionsContainer.innerHTML = suggestions.map(s =>
            `<button class="suggestion-chip" data-question="${s.question}">${s.text}</button>`
        ).join('');
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.getAttribute('data-question');
                addMessage(question, 'user');
                processMessage(question);
            });
        });
    }

    // ========== UI HELPERS ==========
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        const content = document.createElement('div');
        content.className = 'message-content';
        const formattedText = text.replace(/\n/g, '<br>');
        content.innerHTML = `<p>${formattedText}</p>`;
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messageDiv.appendChild(time);
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        isTyping = true;
        typingIndicator.classList.add('active');
        sendMessageBtn.disabled = true;
    }

    function hideTypingIndicator() {
        isTyping = false;
        typingIndicator.classList.remove('active');
        sendMessageBtn.disabled = false;
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message && !isTyping) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            chatbotInput.style.height = 'auto';
            processMessage(message);
        }
    }

    function handleQuickQuestion(question) {
        addMessage(question, 'user');
        processMessage(question);
    }

    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        notificationDot.style.display = 'none';
        if (chatbotContainer.classList.contains('active')) chatbotInput.focus();
    }

    function closeChatbot() { chatbotContainer.classList.remove('active'); }
    function minimizeChatbot() { chatbotContainer.classList.toggle('minimized'); }

    // Event listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', closeChatbot);
    chatbotMinimize.addEventListener('click', minimizeChatbot);
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Voice input (optional)
    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', () => {
            if (!('webkitSpeechRecognition' in window)) {
                addMessage("Sorry, voice input is not supported in your browser. Please type your message.", 'bot');
                return;
            }
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.start();
            voiceInputBtn.innerHTML = '<i class="fas fa-circle"></i>';
            voiceInputBtn.style.color = '#ff4757';
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                chatbotInput.value = transcript;
                voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceInputBtn.style.color = '';
            };
            recognition.onerror = () => {
                voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceInputBtn.style.color = '';
            };
            recognition.onend = () => {
                voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceInputBtn.style.color = '';
            };
        });
    }

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Quick questions buttons (static from HTML)
    document.querySelectorAll('.quick-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            handleQuickQuestion(question);
        });
    });

    // Initial suggestions
    updateSuggestions('default');
    
    // Optional: show notification after 5 seconds if chatbot not open
    setTimeout(() => {
        if (!chatbotContainer.classList.contains('active')) {
            notificationDot.style.display = 'block';
        }
    }, 5000);
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', initEnhancedChatbot);
// ========== SECTION NAVIGATION (GLOBAL) ==========
const home = document.getElementById('home');
const about = document.getElementById('about');
const academics = document.getElementById('academics');
const admissions = document.getElementById('admissions');
const contact = document.getElementById('contact');   // footer
const achievements = document.getElementById('achievements');

// Extra sections that belong only to the homepage
const stats = document.getElementById('stats');
const parentPortal = document.getElementById('parentPortal');
const gallery = document.getElementById('gallery');
const studentLife = document.getElementById('studentLife');

const homeLink = document.querySelector('a[href="#home"]');
const aboutLink = document.querySelector('a[href="#about"]');
const academicsLink = document.querySelector('a[href="#academics"]');
const admissionsLink = document.querySelector('a[href="#admissions"]');
const contactLink = document.querySelector('a[href="#contact"]');
const achievementsLink = document.querySelector('a[href="#achievements"]');

// Hide all main sections +(the extras)
function hideAllSections() {
    // Main content sections
    if (home) home.style.display = 'none';
    if (about) about.style.display = 'none';
    if (academics) academics.style.display = 'none';
    if (admissions) admissions.style.display = 'none';
    // Extra sections (homepage only)
    if (stats) stats.style.display = 'none';
    if (parentPortal) parentPortal.style.display = 'none';
    if (gallery) gallery.style.display = 'none';
    if (studentLife) studentLife.style.display = 'none';
    if (document.getElementById('bece-results')) document.getElementById('bece-results').style.display = 'none';
    if (achievements) achievements.style.display = 'none';
    // Footer (contact) is always visible – do NOT hide it
}

// Show only the homepage + its extra sections
function showHome() {
    hideAllSections();
    if (home) home.style.display = 'block';
    if (stats) stats.style.display = 'block';
    if (parentPortal) parentPortal.style.display = 'block';
    if (gallery) gallery.style.display = 'block';
    if (studentLife) studentLife.style.display = 'block';
    if (document.getElementById('bece-results')) document.getElementById('bece-results').style.display = 'block';
    // Footer remains visible
}

// Show a single non-home section (and hide everything else)
function showOtherSection(section) {
    hideAllSections();
    if (section) section.style.display = 'block';
}

// Attach click handlers
if (homeLink) homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
    window.location.hash = 'home';
});

if (aboutLink) aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOtherSection(about);
    window.location.hash = 'about';
});

if (academicsLink) academicsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOtherSection(academics);
    window.location.hash = 'academics';
});

if (admissionsLink) admissionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOtherSection(admissions);
    window.location.hash = 'admissions';
});

if (contactLink) contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOtherSection(contact);   // footer
    window.location.hash = 'contact';
});

if (achievementsLink) {
    achievementsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showOtherSection(achievements);
        window.location.hash = 'achievements';
    });
}

// Handle initial hash on page load and hash changes
function handleInitialHash() {
    const hash = window.location.hash;
    if (hash === '#home') showHome();
    else if (hash === '#about') showOtherSection(about);
    else if (hash === '#academics') showOtherSection(academics);
    else if (hash === '#admissions') showOtherSection(admissions);
    else if (hash === '#achievements') showOtherSection(achievements);
    else if (hash === '#contact') showOtherSection(contact);
    else showHome();  // default to home
}

handleInitialHash();
window.addEventListener('hashchange', handleInitialHash);





/*



// ========== SECTION NAVIGATION (GLOBAL) ==========
const home = document.getElementById('home');
const about = document.getElementById('about');
const academics = document.getElementById('academics');
const admissions = document.getElementById('admissions');
const contact = document.getElementById('contact');

const homeLink = document.querySelector('a[href="#home"]');
const aboutLink = document.querySelector('a[href="#about"]');
const academicsLink = document.querySelector('a[href="#academics"]');
const admissionsLink = document.querySelector('a[href="#admissions"]');
const contactLink = document.querySelector('a[href="#contact"]');

function hideAllSections() {
    if (home) home.style.display = 'none';
    if (about) about.style.display = 'none';
    if (academics) academics.style.display = 'none';
    if (admissions) admissions.style.display = 'none';
    // contact is NOT hidden – it stays always visible
}

function showSection(sectionToShow) {
    hideAllSections();
    if (sectionToShow) sectionToShow.style.display = 'block';
}

// Attach click handlers
if (homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); showSection(home); window.location.hash = 'home'; });
if (aboutLink) aboutLink.addEventListener('click', (e) => { e.preventDefault(); showSection(about); window.location.hash = 'about'; });
if (academicsLink) academicsLink.addEventListener('click', (e) => { e.preventDefault(); showSection(academics); window.location.hash = 'academics'; });
if (admissionsLink) admissionsLink.addEventListener('click', (e) => { e.preventDefault(); showSection(admissions); window.location.hash = 'admissions'; });
if (contactLink) contactLink.addEventListener('click', (e) => { e.preventDefault(); showSection(contact); window.location.hash = 'contact'; });

function handleInitialHash() {
    const hash = window.location.hash;
    hideAllSections();
    if (hash === '#home') showSection(home);
    else if (hash === '#about') showSection(about);
    else if (hash === '#academics') showSection(academics);
    else if (hash === '#admissions') showSection(admissions);
    else if (hash === '#contact') showSection(contact);
    else { showSection(home); window.location.hash = 'home'; }
}

handleInitialHash();
window.addEventListener('hashchange', handleInitialHash);

*/












  /*// Get all sections
const home = document.getElementById('home');
const about = document.getElementById('about');
const academics = document.getElementById('academics');
const admissions = document.getElementById('admissions');
const contact = document.getElementById('contact');

// Get all navigation links (assuming they have href like "#home", "#about", etc.)
const homeLink = document.querySelector('a[href="#home"]');
const aboutLink = document.querySelector('a[href="#about"]');
const academicsLink = document.querySelector('a[href="#academics"]');
const admissionsLink = document.querySelector('a[href="#admissions"]');
const contactLink = document.querySelector('a[href="#contact"]');

// Helper function to hide all sections
function hideAllSections() {
    home.style.display = 'none';
    about.style.display = 'none';
    academics.style.display = 'none';
    admissions.style.display = 'none';
    //contact.style.display = 'none';
}

// Helper function to show a specific section (and hide others)
function showSection(sectionToShow) {
    hideAllSections();
    sectionToShow.style.display = 'block';
}

// Attach click handlers to all links
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(home);
    window.location.hash = 'home'; // optionally update URL hash
});

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(about);
    window.location.hash = 'about';
});

academicsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(academics);
    window.location.hash = 'academics';
});

admissionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(admissions);
    window.location.hash = 'admissions';
});

contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(contact);
    window.location.hash = 'contact';
});

// On page load, check the URL hash
function handleInitialHash() {
    const hash = window.location.hash;
    // Hide all first
    hideAllSections();
    
    if (hash === '#home') showSection(home);
    else if (hash === '#about') showSection(about);
    else if (hash === '#academics') showSection(academics);
    else if (hash === '#admissions') showSection(admissions);
    else if (hash === '#contact') showSection(contact);
    else {
        // Default: show home if no hash or unknown hash
        showSection(home);
        window.location.hash = 'home';
    }
}

handleInitialHash();

// Optional: listen for hash changes (if user clicks browser back/forward)
window.addEventListener('hashchange', handleInitialHash);*/


// Initialize enhanced chatbot
document.addEventListener('DOMContentLoaded', initEnhancedChatbot);


// FAQ Functionality for Admissions Section
function initAdmissionsFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize admissions FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdmissionsFAQ);

// Admissions CTA Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const startAppBtn = document.getElementById('startApplication');
    const scheduleTourBtn = document.getElementById('scheduleTour');
    const downloadBrochureBtn = document.getElementById('downloadBrochure');
    
    if (startAppBtn) {
        startAppBtn.addEventListener('click', function() {
            alert('Application form would open here. In a real implementation, this would redirect to the application portal.');
        });
    }
    
    if (scheduleTourBtn) {
        scheduleTourBtn.addEventListener('click', function() {
            alert('Tour scheduling modal would open here. You can integrate a calendar booking system.');
        });
    }
    
    if (downloadBrochureBtn) {
        downloadBrochureBtn.addEventListener('click', function() {
            alert('Brochure download would start here. You can link to a PDF file.');
        });
    }
});






        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Slideshow Functionality
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slide-dot');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Set up automatic slideshow
        let slideTimer = setInterval(nextSlide, slideInterval);

        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideTimer);
                showSlide(index);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });

       
  


// Multi-step form functionality for get access
const accessSteps = document.querySelectorAll('#getAccessModal .step');
const accessFormSteps = document.querySelectorAll('#getAccessModal .form-step');
const nextAccessButtons = document.querySelectorAll('.next-access-step');
const prevAccessButtons = document.querySelectorAll('.prev-access-step');

function goToAccessStep(stepNumber) {
    // Update steps
    accessSteps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    for (let i = 0; i < stepNumber; i++) {
        accessSteps[i].classList.add('completed');
    }
    
    accessSteps[stepNumber - 1].classList.add('active');
    
    // Update form steps
    accessFormSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById(`accessFormStep${stepNumber}`).classList.add('active');
}

nextAccessButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = parseInt(button.closest('.form-step').id.replace('accessFormStep', ''));
        const nextStep = parseInt(button.getAttribute('data-next'));
        
        // Validate current step before proceeding
        if (validateAccessStep(currentStep)) {
            goToAccessStep(nextStep);
        }
    });
});

prevAccessButtons.forEach(button => {
    button.addEventListener('click', () => {
        const prevStep = parseInt(button.getAttribute('data-prev'));
        goToAccessStep(prevStep);
    });
});




// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Original toggle function (defined first)
function toggleMobileMenu(e) {
    e.stopPropagation();
    if (window.innerWidth <= 992) {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        updateMenuIcon();  // update icon when toggling
    }
}

// Update icon based on menu state
function updateMenuIcon() {
    if (!mobileMenu) return;
    const icon = mobileMenu.querySelector('i');
    if (!icon) return;
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Attach event listener
mobileMenu.addEventListener('click', toggleMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
        const isClickInside = navLinks.contains(event.target);
        const isClickOnButton = mobileMenu.contains(event.target);
        if (!isClickInside && !isClickOnButton) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            updateMenuIcon();
        }
    }
});

// Reset menu on window resize above 992px
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        updateMenuIcon();
        // Remove any leftover inline styles
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.width = '';
        navLinks.style.background = '';
        navLinks.style.backdropFilter = '';
        navLinks.style.padding = '';
        navLinks.style.gap = '';
        navLinks.style.borderTop = '';
        navLinks.style.borderBottom = '';
    }
});

// Close mobile menu when a nav link is clicked
const navLinksItems = document.querySelectorAll('.nav-links a');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

function closeMobileMenu() {
    if (window.innerWidth <= 992) {
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        // Update icon back to bars
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Attach click event to every nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});
// Also update icon on page load
updateMenuIcon();




        // Multi-step Form Functionality
        const steps = document.querySelectorAll('.step');
        const formSteps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.next-step');
        const prevButtons = document.querySelectorAll('.prev-step');
        const studentReportForm = document.getElementById('studentReportForm');
        const generatedReport = document.getElementById('generatedReport');
        const printReportBtn = document.getElementById('printReport');

        function goToStep(stepNumber) {
            // Update steps
            steps.forEach(step => {
                step.classList.remove('active', 'completed');
            });
            
            for (let i = 0; i < stepNumber; i++) {
                steps[i].classList.add('completed');
            }
            
            steps[stepNumber - 1].classList.add('active');
            
            // Update form steps
            formSteps.forEach(step => {
                step.classList.remove('active');
            });
            
            document.getElementById(`formStep${stepNumber}`).classList.add('active');
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nextStep = parseInt(button.getAttribute('data-next'));
                goToStep(nextStep);
                
                // If going to the final step, generate the report
                if (nextStep === 3) {
                    generateReport();
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prevStep = parseInt(button.getAttribute('data-prev'));
                goToStep(prevStep);
            });
        });

        function resetForm() {
            studentReportForm.reset();
            goToStep(1);
        }

           

           



  




// Student Life Slider Functionality
function initStudentLifeSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 seconds

    function updateSlider() {
        // Update track position
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            goToSlide(index);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // Auto-slide
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Pause on hover
    const sliderContainer = document.querySelector('.student-life-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, slideInterval);
    });

    // Initialize
    updateSlider();
}

// Copy login functionality to mobile select
const mobileLoginSelect = document.getElementById('mobileLoginSelect');
if (mobileLoginSelect) {
    mobileLoginSelect.addEventListener('change', function(e) {
        const role = e.target.value;
        if (role) {
            alert(`Redirecting to ${role} portal... (demo)`);
            // Add your actual redirect logic here
        }
    });
}

   

// Initialize the slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initStudentLifeSlider);

// Animate BECE performance bars (resets width to 0 then animates to original)
function animateBECEBars() {
    const bars = document.querySelectorAll('#achievements .chart-bar');
    if (!bars.length) return;
    
    bars.forEach(bar => {
        // Store the target width from inline style or computed style
        let targetWidth = bar.style.width;
        if (!targetWidth && bar.getAttribute('style')) {
            // Extract width from style attribute if present
            const match = bar.getAttribute('style').match(/width:\s*([^;]+)/);
            if (match) targetWidth = match[1];
        }
        if (!targetWidth) return;
        
        // Reset to 0
        bar.style.width = '0';
        // Force a reflow to ensure the reset is applied
        void bar.offsetHeight;
        // Animate to target
        bar.style.width = targetWidth;
    });
}