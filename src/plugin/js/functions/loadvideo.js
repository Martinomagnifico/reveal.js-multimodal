export async function loadVideo(url, modal, options) {
    try {
        const video = document.createElement('video');
        video.src = url;
        video.controls = options.videocontrols;
        video.preload = "metadata"; // Load only metadata initially

        // Wait for video metadata to be loaded
        await new Promise((resolve, reject) => {
            video.addEventListener('loadedmetadata', resolve);
            video.addEventListener('error', reject);
        });

        // Check if video metadata is loaded
        if (video.readyState >= 1) { 
            video.preload = "auto";
            // Wait for video to be fully loaded
            await new Promise((resolve, reject) => {
                video.addEventListener('canplaythrough', resolve);
                video.addEventListener('error', reject);
            });
            modal.modalElement.dataset.modalType = 'video';
            video.classList.add("mm-body");
            return video.outerHTML;
        } else {
            throw new Error('Video metadata cannot be loaded.');
        }
    } catch (error) {
        console.error('Error loading video:', error);
        return null;
    }
}
