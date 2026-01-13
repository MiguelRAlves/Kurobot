import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada no .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

interface ChatRequestBody {
    message: string;
    history: Content[];
}

app.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
    const { message, history } = req.body;

    try {
        const chatSession = model.startChat({ history });
        const result = await chatSession.sendMessage(message);
        const response = result.response.text();

        res.json({ response });
    } catch (error) {
        console.error("Erro ao processar a mensagem:", error);
        res.status(500).json({ error: "Erro ao processar a resposta da IA" });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});