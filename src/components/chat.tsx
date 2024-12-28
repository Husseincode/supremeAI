/** @format */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/stylish.module.css';
//import Image from 'next/image';
//import defaultUser from '@/public/assets/defaultUser.png';
//import SendIconSVG from './sendIcon.svg';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';
import LoadingBalls from '../components/loading/loading';
import { getChatResponse } from '../pages/api/chat';

/**creating types of Message interface */
interface Message {
  sender: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  /**messages and setMessages state created as an array to store users and bots details and messages */
  const [messages, setMessages] = useState<Message[]>([]);
  /**
   * input state created to store or hold users input
   */
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const botRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<string>('#9ca3af');

  const sendMessage = async () => {
    /**if no message is inputted, sendMessage function will stop the rest
     * of the codes from executing
     */
    if (input.trim() === '') return;

    /**
     * if message is not '', userMessage object is declared with props of sender and content,
     * then - added to the array of messages while preserving the content
     * it has.
     */
    const userMessage: Message = { sender: 'user', content: input };
    setMessages([...messages, userMessage]);

    // Clear input
    setInput('');
    /**
     * set the loading display to true, while it gets message from the bot
     */
    setIsLoading(true);

    try {
      // Send message to the backend
      //const response = await axios.post('/api/chat', { message: input });

      // Add bot response
      // const botMessage: Message = {
      //   sender: 'bot',
      //   content: response.data.reply,
      // };
      const botResponse = await getChatResponse(input);
      //setMessages((prev) => [...prev, { user: 'ChatGPT', text: botResponse }]);
      setMessages((prev) => [...prev, { sender: 'bot', content: botResponse }]);

      //setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        sender: 'bot',
        content: 'Sorry, something went wrong!',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
      setIsLoading(true);
      setTimeout(() => {
        setInput('');
      }, 50);
    }
  };
  //console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (botRef.current && !botRef.current.contains(event.target as Node)) {
  //     setIsClicked(false);
  //   }
  // };

  // useEffect(() => {
  //   // Add event listener when the component mounts
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [botRef]);

  //useEffects
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section
      className={`w-full slide-from-left fixed z-40 bottom-10 md:right-5 flex items-end justify-end px-5 md:px-0`}>
      <div
        ref={botRef}
        className='w-full md:w-[350px] md:max-w-[350px] h-[400px] p-[10px] rounded-md shadow-xl bg-white flex flex-col gap-2'>
        {/* <div className='w-fit absolute p-4 right-0 bg-white rounded-full'>
        <FontAwesomeIcon icon={faClose}/>
      </div> */}
        <div
          className={`bg-gray-400 w-full md:max-w-[350px] border h-[400px] overflow-y-scroll scrollbar-hide rounded-md p-2`}>
          <div className='header h-[40px] w-full bg-white rounded-md border flex items-center pl-2 gap-3'>
            <div className='bg-[#CCCCE3] w-fit rounded-full'>
              {/* <Image
                  src={userImg ? userImg : defaultUser}
                  width={30}
                  height={30}
                  className='rounded-full'
                  alt=''
                /> */}
            </div>
            <span className='text-sm'>Jarvis</span>
          </div>
          <div className='flex-1 py-4 overflow-y-scroll scrollbar-hide'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-1 mb-4 flex-wrap ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                {msg.sender === 'bot' && (
                  <div className='w-[25px] h-[25px] bg-white text-center pt-1 font-bold border rounded-full text-xs'>
                    R
                  </div>
                )}
                <div
                  className={`flex flex-wrap text-sm text-wrap px-4 py-2 rounded-lg border bg-white text-gray-800`}>
                  {msg.content}
                  {/* <span className='absolute z-10 text-xs'>{new Date().getTime()}</span> */}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start mb-4'>
                <span className="bg-gray-200 text-sm text-gray-800 p-2 rounded-lg flex items' gap-1">
                  <span>Bot is typing</span> <LoadingBalls />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className='min-h-[40px] border rounded-md bg-[#F5F5F5] flex items-center justify-between px-2'>
          <textarea
            value={input}
            onKeyPress={handleKeyPress}
            onKeyUp={(e: React.FormEvent) => {
              e.preventDefault();
              if (input !== '') {
                setColor('#0E0E0E');
              } else {
                setColor('#9ca3af');
              }
            }}
            onChange={(event: { target: { value: string } }) => {
              setInput(event.target.value);
            }}
            className='outline-none px-2 pt-4 pb-2 bg-transparent w-full text-sm resize-none'
            placeholder='Type a message'></textarea>
          {/* <span>
                <SendIconSVG/>
            </span> */}
          <button type='button' onClick={sendMessage}>
            {''}
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              className='cursor-pointer'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <rect width='32' height='32' rx='16' fill={color} />
              <path
                d='M9.72362 9.05279C9.55282 8.96739 9.34828 8.98673 9.19652 9.10265C9.04476 9.21857 8.97227 9.4108 9.00973 9.59806L10.4126 14.4478C10.466 14.6325 10.6207 14.7702 10.8103 14.802L16.5 15.7549C16.768 15.8084 16.768 16.1915 16.5 16.2451L10.8103 17.198C10.6207 17.2298 10.466 17.3675 10.4126 17.5522L9.00973 22.4019C8.97227 22.5892 9.04476 22.7814 9.19652 22.8974C9.34828 23.0133 9.55282 23.0326 9.72362 22.9472L22.7236 16.4472C22.893 16.3625 23 16.1894 23 16C23 15.8106 22.893 15.6375 22.7236 15.5528L9.72362 9.05279Z'
                fill='#FCFCFC'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatBot;
