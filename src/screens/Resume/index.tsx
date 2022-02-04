import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<
    CategoryDataProps[]
  >([]);
  const theme = useTheme();
  async function loadData() {
    const dataKey = "@goFinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionDataProps) => expensive.type === "negative"
    );
    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionDataProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
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
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent,
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
      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          x={"percent"}
          y="total"
          colorScale={totalByCategories.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: "bold",
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
        />
      </ChartContainer>
      <Content>
        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
