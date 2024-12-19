import { useState } from "react";
import {
  Container,
  Header,
  Footer,
  Text,
  TextInput,
  Button,
  Alert,
  Box,
} from "@mantine/core";
import axios from "axios";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponseData(null);

    try {
      // OpenAI APIにリクエストを送信
      const response = await axios.post("/api/openai", { prompt: inputValue });
      setResponseData(response.data);
    } catch (err) {
      setError("APIリクエストに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* ヘッダー */}
      <Header height={60} p="md">
        <Text weight={700} size="lg">
          ChatGPT API Demo with Mantine
        </Text>
      </Header>

      {/* メインコンテンツ */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Text size="lg" mb="md">
          以下に質問を入力して送信してください:
        </Text>
        <Box sx={{ maxWidth: 400, margin: "auto" }}>
          <TextInput
            placeholder="質問を入力"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            mb="md"
          />
          <Button onClick={handleSubmit} loading={loading} fullWidth>
            送信
          </Button>
        </Box>

        {/* APIの結果 */}
        {responseData && (
          <Alert title="APIの結果" color="green" mt="md">
            {responseData.message}
          </Alert>
        )}
        {error && (
          <Alert title="エラー" color="red" mt="md">
            {error}
          </Alert>
        )}
      </main>

      {/* フッター */}
      <Footer height={60} p="md">
        <Text align="center" color="dimmed">
          © 2024 ChatGPT Demo
        </Text>
      </Footer>
    </Container>
  );
}
