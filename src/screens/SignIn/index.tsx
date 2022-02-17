import React from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Ttile,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "react-native";
export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleLoginSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);

      Alert.alert("Não foi possível conectar a conta Google");
    }
  }
  async function handleLoginSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);

      Alert.alert("Não foi possível conectar a conta Apple");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Ttile>Controle suas {"\n"}finanças de forma muito simples</Ttile>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleLoginSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleLoginSignInWithApple}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
