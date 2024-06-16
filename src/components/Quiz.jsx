import React, { useState, useEffect } from 'react'
import questions from '../utils/questions.json'

const Quiz = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(() => {
        const savedCurrentQuestion = localStorage.getItem('currentQuestion');
        return savedCurrentQuestion ? parseInt(savedCurrentQuestion) : 0;
    });
    const [score, setScore] = useState(0);
    const [seeScore, setSeeScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTimeLeft = localStorage.getItem('timeLeft');
        return savedTimeLeft ? parseInt(savedTimeLeft) : 600; // 10 minutes in seconds
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleNextQuestion = () => {
        if (selectedOption) {
            setScore(selectedOption === questions[currentQuestion].answer ? score + 1 : score);

        }
        if (questions.length - 1 > currentQuestion) {
            localStorage.setItem('currentItem', String(currentQuestion + 1));
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption('');
        } else {
            setSeeScore(true);
        }
    }

    const handleHome = () => {
        window.location.reload();
        localStorage.removeItem('timeLeft');
        localStorage.removeItem('currentQuestion');
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                localStorage.setItem('timeLeft', String(prevTime - 1));
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        localStorage.setItem('currentQuestion', String(currentQuestion));
    }, [currentQuestion])

    console.log(currentQuestion);

    return (
        <>
            {seeScore ?
                <div className='flex w-full h-[calc(100vh-64px)] items-center justify-center gap-10 flex-col'>
                    <h3 className='text-[40px] font-semibold text-green-500'>Your Score</h3>
                    <div className='flex p-4 h-[200px] w-[200px] rounded-full border-2 border-green-500 items-center justify-center text-center'>
                        <h1 className='text-[40px] font-semibold text-green-500'>{score} / <span className='text-black'>10</span></h1>
                    </div>
                    <button
                        onClick={handleHome}
                        className='font-medium p-4 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out'
                    >
                        Go to Home
                    </button>
                </div>
                :
                <div className='flex w-full h-[calc(100vh-64px)] items-center justify-center flex-col gap-10'>
                    <h3 className='text-center mx-1'>Note : The <b>Next Question Button</b> will not work if you don't choose any option.</h3>
                    <h3 className='font-semibold text-lg'>Time left: {Math.floor(timeLeft / 60)} min : {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60} sec</h3>
                    <div
                        className='flex p-4 flex-col gap-6 hover:bg-green-50 rounded-lg w-[90%] sm:w-[500px]'
                        style={{ boxShadow: 'rgba(144, 238, 144, 1) 0px 1px 3px, rgba(144, 238, 144, 1) 0px 1px 2px' }}
                    >
                        <h3 className='text-lg font-semibold'><span>Q.{currentQuestion + 1}</span> <br />{questions[currentQuestion].question}</h3>
                        <div className='font-medium gap-4 flex flex-col'>
                            {questions[currentQuestion].options.map((option) => (
                                <label key={option} className='flex items-center cursor-pointer'>
                                    <input
                                        type='radio'
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={handleOptionChange}
                                        className='w-5 h-5'
                                    />
                                    <span className="ml-4">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className='font-medium p-4 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out'
                    >
                        {currentQuestion == questions.length - 1 ? 'See Score' : 'Next Question'}
                    </button>
                </div>
            }
        </>
    )
}

export default Quiz