import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Quiz from '../components/Quiz';

const Home = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => setIsFullscreen(true))
                .catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message}`));
        } else {
            document.exitFullscreen()
                .then(() => setIsFullscreen(false))
                .catch(err => console.error(`Error attempting to exit full-screen mode: ${err.message}`));
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <main className='w-full h-[100vh]'>
            <Navbar />
            {isFullscreen ?
                <Quiz />
                :
                <div className='w-full h-[calc(100vh-64px)] flex justify-center items-center'>
                    <div className='flex gap-10 p-6 flex-col items-center max-w-[500px] text-center rounded-lg'
                        style={{ boxShadow: 'rgba(144, 238, 144, 1) 0px 1px 3px, rgba(144, 238, 144, 1) 0px 1px 2px' }}
                    >
                        <h3 className='font-bold text-3xl'>Enter Full Screen Mode to Start/Resume Quiz</h3>
                        <button
                            onClick={toggleFullscreen}
                            className='bg-green-500 p-2 rounded-lg text-white font-medium text-lg hover:bg-green-600 transition-colors duration-300 ease-in-out'>
                            Enter Full Screen Mode
                        </button>
                    </div>
                </div>
            }
        </main>
    )
}

export default Home