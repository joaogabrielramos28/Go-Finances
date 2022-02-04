import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content } from "./styles";
import { categories } from "../../utils/categories";
import { ScrollView } from "react-native";

interface TransactionDataProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryDataProps {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<
    CategoryDataProps[]
  >([]);

  async function loadData() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionDataProps) => expensive.type === "negative"
    );

    const totalByCategory: CategoryDataProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionDataProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
