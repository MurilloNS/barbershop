<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <p>Bem-vindo! Entre na sua conta.</p>

      <div class="form-group">
        <input type="email" placeholder="E-mail" v-model="email" />
        <input type="password" placeholder="Senha" v-model="password" />
      </div>

      <button class="login-button" @click="handleLogin">Entrar</button>

      <div class="register-link">
        <p>
          Ainda não tem uma conta?
          <router-link to="/register">Registrar-se</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/api/userApi";
import Swal from "sweetalert2";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    if (!email.value || !password.value) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "E-mail e senha são obrigatórios!",
        background: "#2e2b3d",
        color: "#fff",
        confirmButtonColor: "#d33",
      });

      return;
    }

    Swal.fire({
      title: "Aguarde",
      text: "Autenticando...",
      allowOutsideClick: false,
      background: "#2e2b3d",
      color: "#fff",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const loginData = {
      email: email.value,
      password: password.value,
    };

    const response = await loginUser(loginData);
    const message = response.data.message;

    Swal.close();
    localStorage.setItem("token", response.data.token);
    router.push("/dashboard");
  } catch (e) {
    Swal.close();
    const errorMessage = e.response?.data?.message || "Erro inesperado.";

    Swal.fire({
      icon: "error",
      title: "Ops, algo deu errado",
      text: errorMessage,
      background: "#2e2b3d",
      color: "#fff",
      confirmButtonColor: "#d33",
      showClass: {
        popup: "animate__animated animate__shakeX",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2e2b3d;

  .login-form {
    background-color: #ffffff;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;

    h2 {
      margin-bottom: 1em;
      color: #333;
    }

    .form-group {
      display: flex;
      flex-direction: column;

      input {
        margin-bottom: 1em;
        padding: 0.8em;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          border-color: #7f7aff;
          outline: none;
        }
      }
    }

    .login-button {
      padding: 0.8em;
      background-color: #7f7aff;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #6a68d3;
      }
    }

    .register-link {
      margin-top: 1em;
      text-align: center;

      p {
        color: #777;
        font-size: 0.9rem;
      }

      a {
        color: #7f7aff;
        text-decoration: none;
      }
    }
  }
}
</style>
