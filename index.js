
require('dotenv').config();

const { Telegraf, Markup } = require('telegraf');
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const TelegramBot = require('node-telegram-bot-api');
const bot = new Bot(process.env.BOT_API_KEY,{polling: true});

const linkArray = [
  'https://i.postimg.cc/ZR4f9LqL/photo-1-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/KjYJfvBk/photo-11-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/NFV7x8QS/photo-2-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/kX6ygHcm/photo-3-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/Y0JYFp3w/photo-4-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/CLqjgqhM/photo-5-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/htRVPtvL/photo-7-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/zXZk3jPH/photo-8-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/J4ptS7J7/photo-9-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/FH11vtgy/photo-10-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/bvtJGQ5d/photo-12-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/gJb03x9s/photo-13-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/Twj30Tf6/photo-14-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/KjZvsC8g/photo-15-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/yxvYqnDp/photo-16-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/m2gg3xnv/photo-18-2024-02-11-05-00-12.jpg',
  'https://i.postimg.cc/XYZNhf4x/photo-25-2024-02-11-05-00-12.jpg',
];

// ======================================= MAIN

bot.command('start', async (ctx) => {
  isRegistered = false;
  const inlineKeyboard = new InlineKeyboard()
      .text('РЕГИСТРАЦИЯ', 'GetRegister');
  await ctx.replyWithPhoto('https://ibb.co/xjgkq9V');
  await ctx.reply('Добро пожаловать в 💎MINES V2💎 \n\n💣 Mines - это гэмблинг игра в букмекерской конторе \"1WIN\", которая основывается на классическом “Сапёре”.\nВаша цель - открывать безопасные ячейки и не попадаться в ловушки.\n\nНаш бот основан на нейросети от Bitsgap \nОн может предугадать расположение звёзд с вероятностью 87%.', {
      reply_markup: inlineKeyboard
  });
});

bot.on('callback_query:data', async (ctx) => {
  if (ctx.callbackQuery.data === 'GetRegister') {
      const inlineKeyboard = new InlineKeyboard().text('ПРОВЕРИТЬ ID', 'CheckId');
      await ctx.reply('1. Для начала зарегистрируйтесь по ссылке на сайте 1WIN (CLICK) (https://1wowei.xyz/v3/landing-page/casino#uihs)\n2. После успешной регистрации cкопируйте ваш айди на сайте (Вкладка \'пополнение\' и в правом верхнем углу будет ваш ID).\n3. После нажмите на кнопку "проверить id" и напишите свой id', {
          reply_markup: inlineKeyboard
      });
  }
  else if (ctx.callbackQuery.data === 'CheckId') {
      isRegistered = true;
  }

  if (ctx.callbackQuery.data === 'GetSignal') {
    const SignalKeyboard = new InlineKeyboard()
    .text('ПОЛУЧИТЬ СИГНАЛ','GetSignal');

    const randomIndex = Math.floor(Math.random() * linkArray.length);
    // Get the random link from the array
    const randomLink = linkArray[randomIndex];
    await ctx.replyWithPhoto(randomLink, {
      reply_markup: SignalKeyboard
    });
  }

});

let isRegistered = false;

bot.hears(/.*/, async function registrationHandler(ctx) {
  const SignalKeyboard = new InlineKeyboard()
  .text('ПОЛУЧИТЬ СИГНАЛ','GetSignal');
  if (isRegistered) {
      
      if (ctx.message.text.length !== 8 || !/^\d+$/.test(ctx.message.text)) {
          await ctx.reply('Неверный формат регистрационного номера, регистрация не пройдена');
      } else {
          await ctx.reply('Регистрация прошла успешно', {
            
              reply_markup: SignalKeyboard
              
          });
          isRegistered = false;
      }
  }
});

// ======================================= ПРОВЕРКА ОШИБОК

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });


bot.start();