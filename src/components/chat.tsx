/** @format */
'use client';
import defaultUser from '@//assets/defaultUser.png';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/stylish.module.css';
import axios from 'axios';
import LoadingBalls from '../components/loading/loading';
import '../styles/styles.css';
import Image from 'next/image';

/** Message Interface */
interface Message {
  sender: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#9ca3af');

  /** Scroll to the latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /** Load chat history on mount */
  useEffect(() => {
    const history = getChatHistory();
    setMessages(history);
  }, []);

  /** Save chat history to localStorage */
  const saveChatHistory = (messages: Message[]) => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  /** Retrieve chat history from localStorage */
  const getChatHistory = (): Message[] => {
    try {
      const history = localStorage.getItem('chatHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error parsing chat history:', error);
      return [];
    }
  };

  /** Send a message */
  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);

    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botMessage: Message = { sender: 'bot', content: res.data.response };
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveChatHistory(newMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        sender: 'bot',
        content: 'Sorry, something went wrong!',
      };
      const errorMessages = [...updatedMessages, errorMessage];
      setMessages(errorMessages);
      saveChatHistory(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle Enter key press */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    setColor(input !== '' ? '#000000' : '#9ca3af');
  };

  return (
    <section className='w-full flex md:justify-center md:items-center h-[100vh] slide-from-left md:px-0'>
      <div
        ref={messagesEndRef}
        className='w-full md:w-[350px] md:h-[500px] p-2 md:rounded-md shadow-xl bg-white flex flex-col gap-2'>
        <div className='header justify-center w-full h-[40px] bg-white rounded-md flex items-center px-2'>
          <div className='flex items-center justify-center'>
            {' '}
            <h2 className='text-lg font-medium'>Jarvis</h2>
            <Image
              src={defaultUser}
              width={30}
              height={30}
              className='rounded-full'
              alt=''
            />
          </div>
        </div>
        <div
          className={`chatWallPaper w-full border md:h-[300px] h-[500px] overflow-y-scroll scrollbar-hide rounded-md p-2`}>
          <div className='flex-1 py-4 overflow-y-scroll scrollbar-hide'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-1 mb-4 flex-wrap ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                {msg.sender === 'bot' && (
                  <div className='w-[25px] h-[25px] bg-white text-center pt-1 font-bold border rounded-full text-xs'>
                    J
                  </div>
                )}
                <div className='flex flex-wrap text-sm px-4 py-2 rounded-lg border bg-white text-gray-800'>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start mb-4'>
                <span className='bg-gray-200 text-sm text-gray-800 p-2 rounded-lg flex items-center gap-1'>
                  <span>Jarvis is typing...</span> <LoadingBalls />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className='min-h-[100px] border rounded-md bg-[#F5F5F5] flex items-center justify-between px-2'>
          <textarea
            value={input}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInput(e.target.value)}
            className='outline-none px-2 pt-4 pb-2 bg-transparent w-full text-sm resize-none'
            placeholder='Type a message...'
          />
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

// const chatWallpaper = {
//   background: `url(${})`
// }

export default ChatBot;
