import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineDownload } from "react-icons/ai";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import TextChangeEffect from "../components/TextChangeEffect";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AboutMe: React.FC = () => {
    const { t } = useLanguage();
    const { darkMode } = useTheme();
    const [pdfSrc, setPdfSrc] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCVClick = () => {
        setPdfSrc("/CV.pdf");
    };

    const handleReferencesClick = () => {
        setPdfSrc("/Bescheinigung.pdf");
    };

    return (
        <main className={`min-h-screen flex flex-col items-center pt-24 pb-8`}>
            {!pdfSrc ? (
                <section className="text-center px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        <TextChangeEffect text={t("aboutMe.title")} />
                    </h1>
                    <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
                    <TextChangeEffect text={t('aboutMe.description')} />
                </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                        <button
                            onClick={handleCVClick}
                            className="button px-6 py-3 text-lg md:text-xl"
                        >
                            <TextChangeEffect text={t("aboutMe.cvButton")} />
                        </button>
                        <button
                            onClick={handleReferencesClick}
                            className="button px-6 py-3 text-lg md:text-xl"
                        >
                            <TextChangeEffect text={t("aboutMe.referencesButton")} />
                        </button>
                    </div>
                </section>
            ) : (
                <div className="w-full max-w-4xl px-4">
                    <div
                        className={`sticky top-16 z-50 w-full py-4 flex flex-col md:flex-row gap-4 justify-center items-center`}
                    >
                        <button
                            className="button px-6 py-3"
                            onClick={() => setPdfSrc(null)}
                        >
                            <TextChangeEffect text={t("aboutMe.backButton")} />
                        </button>
                        <a
                            href={pdfSrc}
                            download
                            className="button px-6 py-3 flex items-center"
                        >
                            <AiOutlineDownload className="mr-2" />
                            <TextChangeEffect text={t("aboutMe.downloadButton")} />
                        </a>
                    </div>

                    <div className="w-full overflow-auto shadow-xl rounded-lg mt-4">
                        <Document
                            file={pdfSrc}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            
                        >
                            {Array.from({ length: numPages || 0 }, (_, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    width={Math.min(width * 0.9, 800)}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    className="p-4"
                                    loading={
                                        <div className="p-4 text-center">
                                            {t("aboutMe.loadingPage")} {index + 1}...
                                        </div>
                                    }
                                />
                            ))}
                        </Document>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AboutMe;