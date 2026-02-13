const STORAGE_KEY = 'pawprint_recently_viewed';
const MAX_RECENT = 5;

export function addToRecentlyViewed(petId) {
    let recent = getRecentlyViewed();
    recent = recent.filter(id => id !== petId);
    recent.unshift(petId);
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
}

export function getRecentlyViewed() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}