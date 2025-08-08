export default function clientsFilter() {
    console.log('Clients filter function started');
    
    const categoryFilters = document.getElementById('categoryFilters');
    const environmentFilters = document.getElementById('environmentFilters');
    const grid = document.getElementById('clientsGrid');
    const scrollHint = document.getElementById('scrollHint');
    
    if (!categoryFilters || !grid) {
        console.log('Elements not found', { categoryFilters, grid });
        return;
    }
    
    console.log('Elements found, starting data load');
    
    let allClients = [];
    let currentFilter = 'all';
    let selectedEnvironment = null; // Track selected environment/court type filter
    let visibleCount = 24;
    const loadMoreCount = 12; // How many to load each time
    let isLoading = false; // Prevent multiple simultaneous loads
    
    // Load clients data from JSON file
    fetch('/assets/content/clients-data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Data loaded successfully:', data);
            
            // Process the clients array
            if (data.clients && Array.isArray(data.clients)) {
                allClients = data.clients;
            }
            
            updateFilterCounts(data);
            updateEnvironmentFilters();
            setupFilterEventListeners();
            renderClients();
            
            // Initialize infinite scroll after initial render
            setTimeout(() => {
                setupInfiniteScroll();
                console.log('Infinite scroll initialized');
            }, 500);
        })
        .catch(error => {
            console.error('Error loading client data:', error);
            grid.innerHTML = '<p style="color: white; text-align: center;">Error loading client data</p>';
        });
    
    // Function to update category filter counts
    function updateFilterCounts(data) {
        // Count clients by category
        const categoryCounts = {};
        allClients.forEach(client => {
            client.categories.forEach(category => {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });
        });
        
        // Update each count display
        const countElements = {
            'all': document.getElementById('count-all'),
            'partnerships': document.getElementById('count-partnerships'),
            'colleges': document.getElementById('count-colleges'),
            'clubs': document.getElementById('count-clubs'),
            'facilities': document.getElementById('count-facilities'),
            'organizations': document.getElementById('count-organizations'),
            'corporate': document.getElementById('count-corporate')
        };
        
        Object.keys(countElements).forEach(key => {
            const element = countElements[key];
            if (element) {
                if (key === 'all') {
                    element.textContent = `(${allClients.length})`;
                } else {
                    element.textContent = `(${categoryCounts[key] || 0})`;
                }
            }
        });
    }
    
    // Function to create a client card HTML
    function createClientCard(client) {
        const badgesHtml = client.badges && client.badges.length > 0 ? 
            `<div class="client-card__badges">
                ${client.badges.map(badge => 
                    `<span class="client-card__badge client-card__badge--${badge.replace(/\s+/g, '-')}">${badge}</span>`
                ).join('')}
            </div>` : '';
            
        // Use the first category as the primary category for styling
        const primaryCategory = client.categories && client.categories.length > 0 ? client.categories[0] : '';
            
        return `
            <div class="client-card" data-category="${primaryCategory}">
                <h3 class="client-card__name">${client.name}</h3>
                <p class="client-card__location">${client.location}</p>
                ${badgesHtml}
            </div>
        `;
    }
    
    // Function to get available environments (badges) for current category filter
    function getAvailableEnvironments() {
        const filteredByCategory = currentFilter === 'all' ? allClients : 
            allClients.filter(client => {
                if (client.categories && Array.isArray(client.categories)) {
                    return client.categories.includes(currentFilter);
                } else {
                    return client.category === currentFilter;
                }
            });
        
        const environmentSet = new Set();
        filteredByCategory.forEach(client => {
            if (client.badges && Array.isArray(client.badges)) {
                client.badges.forEach(badge => environmentSet.add(badge));
            }
        });
        
        return Array.from(environmentSet).sort();
    }

    // Function to capitalize each word in a string
    function capitalizeWords(str) {
        return str.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    // Function to update environment filter buttons
    function updateEnvironmentFilters() {
        if (!environmentFilters) return;
        
        const availableEnvironments = getAvailableEnvironments();
        
        if (availableEnvironments.length === 0) {
            environmentFilters.innerHTML = '<p class="filter-no-options">No court type filters available</p>';
            return;
        }
        
        const environmentButtons = availableEnvironments.map(environment => {
            const isSelected = selectedEnvironment === environment;
            const environmentClass = environment.toLowerCase().replace(/\s+/g, '-');
            const displayText = capitalizeWords(environment); // Capitalize each word
            return `
                <button class="filter-toggle ${isSelected ? 'filter-toggle--active' : ''}" 
                        data-environment="${environment}">
                    <span class="filter-toggle__text">${displayText}</span>
                </button>
            `;
        }).join('');
        
        environmentFilters.innerHTML = environmentButtons;
    }

    // Function to setup event listeners for filter buttons
    function setupFilterEventListeners() {
        // Category filter event listeners
        if (categoryFilters) {
            categoryFilters.addEventListener('click', (e) => {
                const button = e.target.closest('.filter-toggle');
                if (!button) return;
                
                const filterValue = button.dataset.filter;
                if (!filterValue) return;
                
                // Update active state
                categoryFilters.querySelectorAll('.filter-toggle').forEach(btn => {
                    btn.classList.remove('filter-toggle--active');
                });
                button.classList.add('filter-toggle--active');
                
                // Update filter state
                currentFilter = filterValue;
                selectedEnvironment = null; // Reset environment filter
                visibleCount = 24; // Reset visible count when filtering
                
                console.log('Category filter changed to:', filterValue);
                updateEnvironmentFilters();
                renderClients();
                
                // Smooth scroll to top of grid when filter changes (with slight delay for render)
                setTimeout(() => {
                    const gridTop = grid.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: Math.max(0, gridTop),
                        behavior: 'smooth'
                    });
                }, 100);
            });
        }
        
        // Environment filter event listeners (delegated)
        if (environmentFilters) {
            environmentFilters.addEventListener('click', (e) => {
                const button = e.target.closest('.filter-toggle');
                if (!button) return;
                
                const environment = button.dataset.environment;
                if (!environment) return;
                
                toggleEnvironmentFilter(environment, button);
            });
        }
    }

    // Function to toggle environment filter selection
    function toggleEnvironmentFilter(environment, buttonElement) {
        // If clicking the same environment, deselect it
        if (selectedEnvironment === environment) {
            selectedEnvironment = null;
            buttonElement.classList.remove('filter-toggle--active');
        } else {
            // Deselect all other environment buttons
            environmentFilters.querySelectorAll('.filter-toggle').forEach(btn => {
                btn.classList.remove('filter-toggle--active');
            });
            
            // Select the new environment
            selectedEnvironment = environment;
            buttonElement.classList.add('filter-toggle--active');
        }
        
        visibleCount = 24; // Reset visible count when filtering
        renderClients(); // Re-render with new filters
        
        // Smooth scroll to grid when environment filter changes
        setTimeout(() => {
            const gridTop = grid.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: Math.max(0, gridTop),
                behavior: 'smooth'
            });
        }, 100);
    }

    // Function to get current filtered clients
    function getCurrentFilteredClients() {
        let filtered = allClients;
        
        // First filter by category
        if (currentFilter !== 'all') {
            filtered = filtered.filter(client => {
                if (client.categories && Array.isArray(client.categories)) {
                    return client.categories.includes(currentFilter);
                } else {
                    return client.category === currentFilter;
                }
            });
        }
        
        // Then filter by environment if one is selected
        if (selectedEnvironment) {
            filtered = filtered.filter(client => {
                if (!client.badges || !Array.isArray(client.badges)) {
                    return false;
                }
                // Client must have the selected environment
                return client.badges.includes(selectedEnvironment);
            });
        }
        
        return filtered;
    }
    
    // Function to render clients with infinite scroll support
    function renderClients(append = false) {
        const filteredClients = getCurrentFilteredClients();
        const clientsToShow = filteredClients.slice(0, visibleCount);
        
        console.log(`Rendering ${clientsToShow.length} of ${filteredClients.length} clients (append: ${append})`);
        
        if (clientsToShow.length === 0 && !append) {
            grid.innerHTML = '<p style="color: white; text-align: center;">No clients to display</p>';
            // Remove fade classes when no content
            grid.classList.remove('has-more-content', 'all-content-shown');
            return;
        }

        // Create client cards HTML
        const cardsHtml = clientsToShow.map((client, index) => {
            const isNewCard = append && index >= (visibleCount - loadMoreCount);
            const animationDelay = isNewCard ? 
                `style="animation-delay: ${(index - (visibleCount - loadMoreCount)) * 50}ms"` : '';
            
            return `
                <div class="client-card ${isNewCard ? 'client-card--revealing' : ''}" 
                     data-category="${client.categories && client.categories.length > 0 ? client.categories[0] : ''}"
                     ${animationDelay}>
                    <h3 class="client-card__name">${client.name}</h3>
                    <p class="client-card__location">${client.location}</p>
                    ${client.badges && client.badges.length > 0 ? 
                        `<div class="client-card__badges">
                            ${client.badges.map(badge => 
                                `<span class="client-card__badge client-card__badge--${badge.replace(/\s+/g, '-')}">${badge}</span>`
                            ).join('')}
                        </div>` : ''}
                </div>
            `;
        }).join('');
        
        if (append) {
            // Append new cards for infinite scroll
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cardsHtml.slice(-(loadMoreCount * 500)); // Get only new cards HTML
            const newCards = Array.from(tempDiv.children).slice(-(loadMoreCount));
            
            newCards.forEach(card => {
                grid.appendChild(card);
            });
            
            // Trigger reveal animation for new cards
            requestAnimationFrame(() => {
                const revealingCards = grid.querySelectorAll('.client-card--revealing');
                revealingCards.forEach(card => {
                    card.classList.add('client-card--revealed');
                });
            });
        } else {
            // Initial render or filter change
            grid.innerHTML = cardsHtml;
        }
        
        // Manage fade effect and scroll hint
        const hasMoreContent = filteredClients.length > visibleCount;
        
        console.log('Managing fade effect:', {
            totalClients: filteredClients.length,
            visibleCount: visibleCount,
            hasMoreContent: hasMoreContent
        });
        
        if (hasMoreContent) {
            // Add fade effect class when there's more content
            grid.classList.add('has-more-content');
            grid.classList.remove('all-content-shown');
            console.log('Added has-more-content class');
            // Show scroll hint
            if (scrollHint && !append) {
                scrollHint.classList.remove('hidden');
            }
        } else {
            // Reduce fade effect when all content is shown
            grid.classList.remove('has-more-content');
            grid.classList.add('all-content-shown');
            console.log('Added all-content-shown class');
            // Hide scroll hint
            if (scrollHint) {
                scrollHint.classList.add('hidden');
            }
        }
        
        isLoading = false; // Reset loading state
    }

    // Infinite scroll functionality
    function setupInfiniteScroll() {
        const scrollHandler = () => {
            // Don't load if already loading or all content is shown
            if (isLoading) return;
            
            const filteredClients = getCurrentFilteredClients();
            if (visibleCount >= filteredClients.length) return;
            
            // Check if user has scrolled near the bottom
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
            
            // Load more when user scrolls to 80% of the content
            if (scrollPercentage > 0.8) {
                isLoading = true;
                console.log('Loading more clients...');
                
                // Add subtle loading state
                grid.classList.add('loading-more');
                
                // Simulate brief loading delay for smooth UX
                setTimeout(() => {
                    const previousCount = visibleCount;
                    visibleCount = Math.min(visibleCount + loadMoreCount, filteredClients.length);
                    
                    // Create and append new cards
                    const newClientsSlice = filteredClients.slice(previousCount, visibleCount);
                    const newCardsHtml = newClientsSlice.map((client, index) => {
                        const animationDelay = `style="animation-delay: ${index * 50}ms"`;
                        
                        return `
                            <div class="client-card client-card--revealing" 
                                 data-category="${client.categories && client.categories.length > 0 ? client.categories[0] : ''}"
                                 ${animationDelay}>
                                <h3 class="client-card__name">${client.name}</h3>
                                <p class="client-card__location">${client.location}</p>
                                ${client.badges && client.badges.length > 0 ? 
                                    `<div class="client-card__badges">
                                        ${client.badges.map(badge => 
                                            `<span class="client-card__badge client-card__badge--${badge.replace(/\s+/g, '-')}">${badge}</span>`
                                        ).join('')}
                                    </div>` : ''}
                            </div>
                        `;
                    }).join('');
                    
                    // Append new cards
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newCardsHtml;
                    Array.from(tempDiv.children).forEach(card => {
                        grid.appendChild(card);
                    });
                    
                    // Update fade effect and scroll hint
                    const hasMoreContent = visibleCount < filteredClients.length;
                    if (hasMoreContent) {
                        grid.classList.add('has-more-content');
                        grid.classList.remove('all-content-shown');
                        if (scrollHint) {
                            scrollHint.classList.remove('hidden');
                        }
                    } else {
                        grid.classList.remove('has-more-content');
                        grid.classList.add('all-content-shown');
                        if (scrollHint) {
                            scrollHint.classList.add('hidden');
                        }
                    }
                    
                    // Remove loading state and trigger reveal animation
                    grid.classList.remove('loading-more');
                    
                    requestAnimationFrame(() => {
                        const revealingCards = grid.querySelectorAll('.client-card--revealing');
                        revealingCards.forEach(card => {
                            card.classList.add('client-card--revealed');
                        });
                        isLoading = false;
                    });
                    
                    console.log(`Loaded ${newClientsSlice.length} more clients. Total visible: ${visibleCount}/${filteredClients.length}`);
                }, 200); // Brief delay for smooth loading experience
            }
        };
        
        // Throttle scroll events for better performance
        let ticking = false;
        const throttledScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    scrollHandler();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', throttledScrollHandler);
        
        // Store reference for cleanup if needed
        window.clientsScrollHandler = throttledScrollHandler;
    }
}
