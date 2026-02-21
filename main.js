const events = [
    {
        id: 1,
        title: "Kyiv River Cleanup",
        date: "June 15, 2024",
        location: "Kyiv, Ukraine",
        type: 'upcoming',
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80fafa5?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Carpathian Forest Toloka",
        date: "July 2, 2024",
        location: "Lviv Region",
        type: 'upcoming',
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Village Tradition Day",
        date: "May 20, 2024",
        location: "Poltava Region",
        type: 'past',
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Odessa Coastline Restoration",
        date: "August 12, 2024",
        location: "Odessa, Ukraine",
        type: 'upcoming',
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    }
];

let currentFilter = 'upcoming';
let searchQuery = '';

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
        menu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function navigate(view) {
    const views = ['landing', 'about', 'events', 'educational', 'start-toloka'];
    views.forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if (el) {
            if (v === view) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
    
    // Close mobile menu if open
    const menu = document.getElementById('mobile-menu');
    if (menu && !menu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
    
    // Reset main content animation
    const main = document.getElementById('main-content');
    main.style.animation = 'none';
    main.offsetHeight; // trigger reflow
    main.style.animation = null;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'events') {
        renderEvents();
    }
}

function filterEvents(type) {
    currentFilter = type;
    const btnUpcoming = document.getElementById('btn-upcoming');
    const btnPast = document.getElementById('btn-past');
    
    if (type === 'upcoming') {
        btnUpcoming.classList.add('bg-white', 'text-forest', 'shadow-sm');
        btnUpcoming.classList.remove('text-forest/50');
        btnPast.classList.remove('bg-white', 'text-forest', 'shadow-sm');
        btnPast.classList.add('text-forest/50');
    } else {
        btnPast.classList.add('bg-white', 'text-forest', 'shadow-sm');
        btnPast.classList.remove('text-forest/50');
        btnUpcoming.classList.remove('bg-white', 'text-forest', 'shadow-sm');
        btnUpcoming.classList.add('text-forest/50');
    }
    
    renderEvents();
}

function handleSearch(event) {
    if (event) event.preventDefault();
    const input = document.querySelector('#view-events input[type="text"]');
    searchQuery = input.value.toLowerCase();
    renderEvents();
}

function renderEvents() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;
    
    const filtered = events.filter(e => {
        const matchesType = e.type === currentFilter;
        const matchesSearch = e.location.toLowerCase().includes(searchQuery) || 
                             e.title.toLowerCase().includes(searchQuery);
        return matchesType && matchesSearch;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <p class="text-forest/40 text-lg italic">No events found matching your search.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(event => `
        <div class="group bg-eco-beige rounded-4xl overflow-hidden border border-forest/5 hover:shadow-2xl transition-all duration-500">
            <div class="relative h-64 overflow-hidden">
                <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold text-forest uppercase tracking-widest">
                    ${event.location}
                </div>
            </div>
            <div class="p-8">
                <div class="flex items-center gap-2 text-sun-600 font-bold text-xs uppercase tracking-widest mb-3">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    ${event.date}
                </div>
                <h4 class="text-2xl font-serif text-forest mb-6 group-hover:text-sun-600 transition-colors">${event.title}</h4>
                <button onclick="openEventModal(${event.id})" class="w-full py-4 rounded-2xl bg-forest text-white font-bold hover:bg-forest-light transition-all shadow-md active:scale-95">
                    ${event.type === 'upcoming' ? 'Join an Event' : 'View Recap'}
                </button>
            </div>
        </div>
    `).join('');
}

function openEventModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const modal = document.getElementById('event-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="relative overflow-hidden rounded-t-4xl h-64">
            <img src="${event.image}" class="w-full h-full object-cover" alt="${event.title}">
            <div class="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent"></div>
            <div class="absolute bottom-6 left-8">
                <span class="bg-sun-500 text-forest text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">${event.location}</span>
                <h3 class="text-3xl font-serif text-white">${event.title}</h3>
            </div>
        </div>
        <div class="p-8 md:p-12">
            <div class="flex flex-wrap gap-8 mb-8">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-sun-100 rounded-xl flex items-center justify-center text-sun-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-forest/40">Date</p>
                        <p class="font-bold text-forest">${event.date}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center text-sage-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-forest/40">Location</p>
                        <p class="font-bold text-forest">${event.location}</p>
                    </div>
                </div>
            </div>
            
            <p class="text-forest/70 leading-relaxed mb-10">
                Join us for a day of community action and cultural celebration. We'll be working together to restore our local environment while learning about the rich traditions that connect us to the land. All equipment and refreshments will be provided.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
                <button onclick="closeEventModal()" class="flex-1 bg-forest text-white py-4 rounded-2xl font-bold hover:bg-forest-light transition-all shadow-lg">
                    ${event.type === 'upcoming' ? 'Register Now' : 'View Photo Gallery'}
                </button>
                <button onclick="closeEventModal()" class="flex-1 border-2 border-forest/10 text-forest py-4 rounded-2xl font-bold hover:bg-sage-50 transition-all">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function handleTolokaSubmit(event) {
    event.preventDefault();
    document.getElementById('toloka-form-container').classList.add('hidden');
    document.getElementById('toloka-success').classList.remove('hidden');
}

function resetTolokaForm() {
    document.getElementById('toloka-success').classList.add('hidden');
    document.getElementById('toloka-form-container').classList.remove('hidden');
    document.querySelector('#view-start-toloka form').reset();
}

// Initial render if needed
document.addEventListener('DOMContentLoaded', () => {
    // Landing is visible by default
});
