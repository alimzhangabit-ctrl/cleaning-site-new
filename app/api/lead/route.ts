import { NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  phone: string;
  serviceId?: string;
  serviceName?: string;
  area?: number | string;
  estimatedPrice?: number | string;
  comment?: string;
  botField?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    // Anti-spam honeypot
    if (body.botField) {
      return NextResponse.json(
        { success: true, message: "Заявка принята" },
        { status: 200 }
      );
    }

    const { name, phone, serviceName, area, estimatedPrice, comment } = body;

    // Validation
    const trimmedName = (name || "").trim();
    const trimmedPhone = (phone || "").trim();

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Пожалуйста, укажите ваше имя (не менее 2 символов)" },
        { status: 400 }
      );
    }

    // Phone validation (numbers, spaces, plus, brackets, dashes, minimum 7 digits)
    const digitsOnly = trimmedPhone.replace(/\D/g, "");
    if (digitsOnly.length < 9) {
      return NextResponse.json(
        { success: false, error: "Пожалуйста, укажите корректный номер телефона" },
        { status: 400 }
      );
    }

    const leadId = `LEAD-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Almaty",
    });

    // Format lead summary
    const formattedLead = {
      id: leadId,
      time: timestamp,
      clientName: trimmedName,
      clientPhone: trimmedPhone,
      service: serviceName || "Не указан",
      area: area ? `${area} кв.м` : "Не указана",
      estimatedPrice: estimatedPrice ? `${estimatedPrice} тг` : "По договоренности",
      comment: comment ? comment.trim() : "—",
    };

    console.log("==========================================");
    console.log(" НОВАЯ ЗАЯВКА НА УБОРКУ [CleanPro Lead]");
    console.log(" ID:", formattedLead.id);
    console.log(" Время (Almaty):", formattedLead.time);
    console.log(" Имя:", formattedLead.clientName);
    console.log(" Телефон:", formattedLead.clientPhone);
    console.log(" Услуга:", formattedLead.service);
    console.log(" Площадь:", formattedLead.area);
    console.log(" Расчетная стоимость:", formattedLead.estimatedPrice);
    console.log(" Комментарий:", formattedLead.comment);
    console.log("==========================================");

    // Optional Telegram notification if env variables are present
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      try {
        const text =
          `🧹 <b>Новая заявка с сайта (${leadId})</b>\n\n` +
          `👤 <b>Имя:</b> ${trimmedName}\n` +
          `📞 <b>Телефон:</b> <code>${trimmedPhone}</code>\n` +
          `✨ <b>Услуга:</b> ${formattedLead.service}\n` +
          `📐 <b>Площадь:</b> ${formattedLead.area}\n` +
          `💰 <b>Расчет:</b> ${formattedLead.estimatedPrice}\n` +
          `💬 <b>Комментарий:</b> ${formattedLead.comment}\n` +
          `⏰ <b>Время:</b> ${timestamp}`;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: "HTML",
          }),
        });
      } catch (tgError) {
        console.error("Telegram notification error:", tgError);
        // Continue without failing customer request
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      message: "Заявка успешно принята! Мы перезвоним вам в течение 5-10 минут.",
    });
  } catch (error) {
    console.error("API Lead Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Произошла внутренняя ошибка сервера. Пожалуйста, позвоните нам напрямую.",
      },
      { status: 500 }
    );
  }
}
