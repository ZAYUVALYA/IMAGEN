        // Update year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Generate image function
        document.getElementById('generateBtn').addEventListener('click', () => {
            const prompt = document.getElementById('promptInput').value.trim();
            const dimensions = document.getElementById('dimensionSelect').value;
            const outputBox = document.getElementById('outputBox');
            
            if (!prompt) {
                alert('Please enter a prompt description');
                return;
            }
            
            // Parse dimensions
            const [width, height] = dimensions.split('x');
            
            // Build API URL
            const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?` + 
                new URLSearchParams({
                    width,
                    height,
                    nologo: true,
                    enhance: true,
                    model: 'flux'
                });
            
            // Update output box with loading state
            outputBox.innerHTML = `
                <div class="text-center p-8">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
                    <p class="text-gray-400">Generating image...</p>
                </div>
            `;
            
            // Fetch image from API
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    outputBox.innerHTML = `
                        <div class="text-center p-4">
                            <img src="${imageUrl}" alt="Generated image" class="max-w-full max-h-[500px] mx-auto rounded-lg shadow-xl">
                            <a href="${imageUrl}" download 
                               class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300">
                                <i class="fas fa-download"></i>
                                <span>Download Image</span>
                            </a>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error('Error:', error);
                    outputBox.innerHTML = `
                        <div class="text-center p-8">
                            <i class="fas fa-exclamation-triangle fa-3x text-red-500 mb-4"></i>
                            <p class="text-red-400 mb-2">Failed to generate image</p>
                            <p class="text-gray-400">Please try again with a different prompt</p>
                        </div>
                    `;
                });
        });

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("promptInput").value = "";
        });

        // Reset button functionality
        document.getElementById('resetBtn').addEventListener('click', () => {
            document.getElementById('promptInput').value = '';
            document.getElementById('outputBox').innerHTML = `
                <div class="text-center p-8">
                    <i class="fas fa-image fa-4x text-gray-600 mb-4 animate-pulse"></i>
                    <p class="text-gray-400">Your generated image will appear here</p>
                </div>
            `;
        });