/** @format */
'use client';
import defaultUser from '@//assets/defaultUser.png';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/stylish.module.css';
import axios from 'axios';
import LoadingBalls from '../components/loading/loading';
import '../styles/styles.css';
import Image from 'next/image';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

/** Message Interface */
interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sendButtonColor, setSendButtonColor] = useState<string>('#9ca3af');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  //const [image, setImage] = useState<File | null>(null);

  /** Scroll to the latest message */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use marked to convert Markdown to HTML
  const convertMarkdownToHtml = (content: string) => {
    return marked(content); // Converts Markdown to HTML
  };

  // Handle file input change
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /** Load chat history on mount */
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const history = localStorage.getItem('chatHistory');
        if (history) {
          setMessages(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };
    loadChatHistory();
  }, []);

  /** Save chat history to localStorage */
  const saveChatHistory = (messages: Message[]) => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  /** Send a message */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);

    setInput('');
    setSendButtonColor('#9ca3af');
    setIsLoading(true);

    try {
      const payload = { message: input };
      const res = await axios.post('/api/chat', payload);

      const botMessage: Message = {
        role: 'bot',
        content: res.data.response,
      };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveChatHistory(newMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'bot',
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
  };

  const renderMessageContent = (message: string) => {
    // Check if the message is code by looking for code block indicators (optional)
    const isCode = message.includes('```');
    //Convert the message content to HTML if it's Markdown
    const htmlContent = convertMarkdownToHtml(message);
    if (isCode) {
      // Remove the surrounding ``` for display
      return (
        <pre className='px-4 py-2'>
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlightAuto(message).value,
            }}
          />
          {/* <code>{message.replace(/```/g, '')}</code> */}
        </pre>
      );
    }
    return (
      <div
        className='message-content px-4 py-2'
        dangerouslySetInnerHTML={{ __html: htmlContent }} // This will safely inject the HTML/Markdown content
      />
    );
    // Convert the message content to HTML if it's Markdown
    // const htmlContent = convertMarkdownToHtml(message);

    // return (
    //   <div
    //     className='message-content'
    //     dangerouslySetInnerHTML={{ __html: htmlContent }} // This will safely inject the HTML/Markdown content
    //   />
    // );
  };

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <section className='w-full h-screen flex md:justify-center md:items-center slide-from-left md:px-0'>
      <div className='w-full md:w-[350px] md:h-[500px] py-2 px-4 md:rounded-md shadow-xl bg-zinc-900 flex flex-col gap-2'>
        <div className='header flex justify-center w-full h-[40px] rounded-md items-center px-2'>
          <h2 className='text-2xl text-white font-medium'>Jarvis</h2>
          <Image
            src={defaultUser}
            width={30}
            height={30}
            className='rounded-full ml-2'
            alt='Default User'
          />
        </div>
        <div className='flex flex-col gap-10'>
          <div className='chatWallPaper w-full md:h-[300px] h-[500px] overflow-y-scroll scrollbar-hide rounded-md p-2'>
            <div className='flex-1 py-4 overflow-y-scroll scrollbar-hide'>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-1 mb-4 flex-wrap ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  {msg.role === 'bot' && (
                    <div className='w-[25px] h-[25px] bg-white text-center pt-1 font-bold border rounded-full text-xs'>
                      J
                    </div>
                  )}
                  <div
                    className={`flex flex-wrap break-words overflow-scroll scrollbar-hide text-sm rounded-lg ${
                      msg.role === 'user' ? 'bg-gray-100' : 'bg-gray-300'
                    } text-gray-800`}>
                    {renderMessageContent(msg.content)}
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

          <div className='min-h-[90px] border rounded-md bg-zinc-500 flex items-center justify-between px-2'>
            <textarea
              value={input}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setInput(e.target.value);
                setSendButtonColor(
                  e.target.value.trim() ? '#000000' : '#9ca3af'
                );
              }}
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
                <rect width='32' height='32' rx='16' fill={sendButtonColor} />
                <path
                  d='M9.72362 9.05279C9.55282 8.96739 9.34828 8.98673 9.19652 9.10265C9.04476 9.21857 8.97227 9.4108 9.00973 9.59806L10.4126 14.4478C10.466 14.6325 10.6207 14.7702 10.8103 14.802L16.5 15.7549C16.768 15.8084 16.768 16.1915 16.5 16.2451L10.8103 17.198C10.6207 17.2298 10.466 17.3675 10.4126 17.5522L9.00973 22.4019C8.97227 22.5892 9.04476 22.7814 9.19652 22.8974C9.34828 23.0133 9.55282 23.0326 9.72362 22.9472L22.7236 16.4472C22.893 16.3625 23 16.1894 23 16C23 15.8106 22.893 15.6375 22.7236 15.5528L9.72362 9.05279Z'
                  fill='#FCFCFC'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBot;
