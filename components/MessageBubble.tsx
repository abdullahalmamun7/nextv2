import React from 'react';
import { Message } from '../types';
import { USER_AVATAR_URL, BOT_NAME } from '../constants';
import RobotSVG from './RobotSVG';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shadow-sm border ${isUser ? 'border-gray-200 bg-gray-100' : 'border-blue-100 bg-white'}`}>
           {isUser ? (
             <img 
               src={USER_AVATAR_URL} 
               alt="User" 
               className="w-full h-full object-cover p-1"
             />
           ) : (
             <RobotSVG className="w-full h-full p-0.5" />
           )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-gray-400 mb-1 px-1">
            {isUser ? 'You' : BOT_NAME}
          </span>
          <div
            className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
              ${isUser 
                ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-tr-sm' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
              } ${message.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
          >
            {message.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== message.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;