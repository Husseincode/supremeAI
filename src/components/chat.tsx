/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import defaultUser from '@//assets/defaultUser.png';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import '../styles/stylish.module.css';
import axios from 'axios';
import LoadingBalls from '../components/loading/loading';
import '../styles/styles.css';
import Image from 'next/image';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from '@//utils/firebaseConfig';
import LoadingPage from './loading/loadingPage';
import { onAuthStateChanged } from 'firebase/auth';
import WelcomePage from './welcomePage';
//import { getChatHistory } from '../utils/getChatHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
//import { DOMPurify } from 'dompurify';

/** Message Interface */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendButtonColor, setSendButtonColor] = useState('#9ca3af');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        setUser(currentUser);
        loadChatHistory(currentUser.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChatHistory = async (uid: string) => {
    try {
      const messagesRef = collection(db, 'users', uid, 'chats');
      const messagesQuery = query(
        messagesRef,
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(messagesQuery);

      const chatHistory: Message[] = querySnapshot.docs.map((doc) => ({
        role: doc.data().sender,
        content: doc.data().content,
        timestamp: doc.data().timestamp.toDate(),
      }));

      // Reverse the chat history to maintain chronological order
      setMessages(chatHistory.reverse());
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };
  const saveChatHistory = async (message: Message) => {
    if (!userId) return;
    try {
      const messagesRef = collection(db, 'users', userId, 'chats');
      await addDoc(messagesRef, {
        sender: message.role,
        content: message.content,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSendButtonColor('#9ca3af');
    setIsLoading(true);
    console.log(userMessage);
    console.log(messages);

    try {
      await saveChatHistory(userMessage);
      const payload = {
        message: input,
        history: messages.slice(-10),
      };
      console.log(payload);
      const res = await axios.post('/api/chat', payload);
      const botMessage: Message = {
        role: 'assistant',
        content: res.data.response,
      };
      setMessages((prev) => [...prev, botMessage]);
      await saveChatHistory(botMessage);
    } catch (error: any) {
      console.error('Error sending message:', error);
      // if (error.response?.status === 429) {
      //   setMessages([
      //     ...messages,
      //     {
      //       role: 'assistant',
      //       content:
      //         'You have reached the API rate limit. Please try again later.',
      //     },
      //   ]);
      // }

      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong!',
      };
      setMessages((prev) => [...prev, errorMessage]);
      await saveChatHistory(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (message: string) => {
    const htmlContent: any = marked(message);
    //const sanitizedContent = DOMPurify.sanitize(htmlContent);
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className='px-4 py-2 text-wrap'
      />
    );
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      // if (event.key === 'Enter') {
      //   sendMessage();
      // }
      setInput(e.target.value);
      setSendButtonColor(e.target.value.trim() ? '#000000' : '#9ca3af');
    },
    []
  );

  if (isPageLoading) return <LoadingPage />;

  return (
    <Suspense fallback={<LoadingPage />}>
      <section className='w-full h-screen flex md:justify-center md:items-center slide-from-left md:px-0 bg-zinc-900 md:bg-transparent'>
        <div className='w-full md:w-[350px] md:h-[500px] py-2 px-4 md:rounded-md slide-from-bottom shadow-xl bg-zinc-900 flex flex-col gap-1'>
          <div className='header bg-zinc-900 flex justify-between w-full h-[40px] rounded-md items-center px-2'>
            {user ? (
              <div
                title={user?.email}
                className='bg-purple-700 cursor-pointer text-white w-[25px] h-[25px] rounded-full text-center'>
                {user.email[0].toUpperCase()}
              </div>
            ) : (
              <div></div>
            )}
            <div className='flex justify-center items-center'>
              <h2 className='text-2xl text-white font-medium'>Jarvis</h2>
              <Image
                src={defaultUser}
                width={30}
                height={30}
                className='rounded-full ml-2'
                alt='Default User'
              />
            </div>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className='w-[20px] h-[20px] cursor-pointer'
              color='gray'
              onClick={() => auth.signOut()}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <div
              className={`chatWallPaper w-full md:h-[300px] h-[500px] overflow-y-scroll scrollbar-hide rounded-md px-4 py-2 ${
                !userId && 'flex justify-center items-center'
              }`}>
              {userId ? (
                <div className='flex-1 py-4 overflow-y-scroll scrollbar-hide'>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-1 mb-4 flex-wrap ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                      {msg.role === 'assistant' && (
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
              ) : (
                <WelcomePage />
              )}
            </div>

            <div className='min-h-[100px] border rounded-md bg-zinc-500 flex items-center justify-between px-2'>
              <textarea
                value={input}
                // onKeyPress={handleKeyPress}
                onChange={handleInputChange}
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
    </Suspense>
  );
};

export default ChatBot;
