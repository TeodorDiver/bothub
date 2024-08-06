import React, { useState, useEffect, useRef } from "react";
import styles from './Modal.module.scss'
import { OpenAIApi, Configuration } from 'openai-edge';


const configuration = new Configuration({
  apiKey: "*********************************************************************************************************************************************************************************************",
  basePath: "https://bothub.chat/api/v2/openai/v1",
});
const openai = new OpenAIApi(configuration);

export default function Modal({ onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null); 

  const handleSend = async () => {
    const userMessage = { role: 'user', content: inputValue };

    // Добавляем сообщение пользователя в состояние
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Отправка сообщения в чат-бот
    const completion = await openai.createChatCompletion({
      messages: [...messages, userMessage],
      model: "gemini-pro",
    });
    const botMessage = (await completion.json()).choices[0].message.content;

    // Добавляем ответ чат-бота в состояние
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: botMessage }]);

    // Очищаем поле ввода
    setInputValue('');
  };

  useEffect(() => {
    // Прокручиваем вниз при обновлении сообщений
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // Эффект срабатывает каждый раз, когда изменяется состояние сообщений


    return (
      <div className={styles.modal}>
        <div className={styles.chatWindow} ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
              {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите сообщение..."
          className={styles.input}
        />

        <button onClick={handleSend} className={styles.b1}>send</button>
        <button onClick={onClose} className={styles.b2}>x</button>
      </div>
    );
  }
