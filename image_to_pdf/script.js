const convertBtn = document.getElementById('convertBtn');
const statusMessage = document.getElementById('statusMessage');
const pdfPreview = document.getElementById('pdfPreview');
const downloadLink = document.getElementById('downloadLink');

convertBtn.addEventListener('click', () => {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length === 0) {
        alert('Please upload at least one image.');
        return;
    }

    // Show the status message with animation
    statusMessage.classList.remove('hidden');
    statusMessage.style.opacity = 1;
    statusMessage.style.transform = 'translateY(0)';

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const files = imageUpload.files;
    let pdfGenerated = false;

    for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                if (i > 0) doc.addPage();
                const width = doc.internal.pageSize.getWidth();
                const height = doc.internal.pageSize.getHeight();
                doc.addImage(img, 'JPEG', 0, 0, width, height);

                // Once all images are processed, show the download link
                if (i === files.length - 1) {
                    const pdfOutput = doc.output('blob');
                    const url = URL.createObjectURL(pdfOutput);
                    downloadLink.href = url;

                    // Hide status message and show the PDF preview with animation
                    setTimeout(() => {
                        statusMessage.style.opacity = 0;
                        statusMessage.style.transform = 'translateY(20px)';
                        pdfPreview.style.opacity = 1;
                        pdfPreview.style.transform = 'translateY(0)';
                    }, 500);

                    pdfPreview.classList.remove('hidden');
                    pdfGenerated = true;
                }
            };
        };
        fileReader.readAsDataURL(files[i]);
    }
});
