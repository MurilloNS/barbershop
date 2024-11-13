<template>
  <div class="register">
    <div class="register-container">
      <div class="register-image">
        <img src="../../assets/images/register.jpg" alt="register" />
        <div class="back-button" @click="handleBack">
          <button>
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon" />
            Início
          </button>
        </div>
      </div>

      <div class="register-form">
        <h2>Crie sua conta</h2>
        <p>Já tem uma conta? <router-link to="/login">Entrar</router-link></p>

        <div class="form-group">
          <input type="text" placeholder="Nome Completo" v-model="form.name" />
          <input
            type="email"
            placeholder="E-mail"
            v-model="form.email"
            @input="touched.email = true"
          />
          <small v-if="touched.email && errors.email" class="error">{{
            errors.email
          }}</small>
          <input
            type="tel"
            placeholder="Celular"
            v-model="form.phone"
            v-mask="'(##) #####-####'"
            maxlength="15"
          />
          <div class="password-group">
            <input
              type="password"
              placeholder="Senha"
              v-model="form.password"
            />
            <input
              type="password"
              placeholder="Confirme sua senha"
              v-model="form.confirmPassword"
            />
          </div>
        </div>

        <button class="create-account-button" @click="handleRegister">
          Criar conta
        </button>

        <div class="or">
          <span>Ou registre-se com</span>
        </div>

        <div class="social-register">
          <button class="google-button">
            <font-awesome-icon :icon="['fab', 'google']" class="icon-google" />
            Google
          </button>
          <button class="apple-button">
            <font-awesome-icon :icon="['fab', 'apple']" class="icon-apple" />
            Apple
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "@/api/userApi";
import Swal from "sweetalert2";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const touched = ref({
  email: false,
});

const errors = computed(() => {
  return {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
      ? ""
      : "E-mail inválido.",
  };
});

const handleRegister = async () => {
  try {
    Swal.fire({
      title: "Aguarde",
      text: "Criando sua conta...",
      allowOutsideClick: false,
      background: "#2e2b3d",
      color: "#fff",
      disOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await registerUser(form.value);
    const message = response.data.message;

    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Cadastro realizado!",
      text: message,
      background: "#2e2b3d",
      color: "#fff",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      confirmButtonColor: "#28a745",
    });

    router.push("/login");
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

const handleBack = () => {
  router.back();
};
</script>

<style lang="scss">
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #eeeeeef8;
  color: #ffffff;
  overflow: hidden;

  .register-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #2e2b3d;
    width: 80vw;
    height: 85vh;
    border-radius: 20px;
    padding: 13px;
    overflow: hidden;
  }

  .register-image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .back-button {
      position: absolute;
      top: 15px;
      left: 15px;
      padding: 6px 14px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 20px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }

      button {
        color: #fff;
        border: none;
        font-size: 14px;
        background-color: transparent;
        font-weight: 600;
        cursor: pointer;

        .icon {
          margin-right: 8px;
        }
      }
    }
  }

  .register-form {
    padding: 0 2em 2em 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2e2b3d;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    h2 {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 0.2em;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 2em;

      a {
        color: #7f7aff;
        text-decoration: none;
        margin-left: 3px
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-bottom: 1em;
      width: 100%;

      input {
        flex: 1;
        padding: 0.8em;
        border: 1px solid #444;
        border-radius: 4px;
        background-color: #3c394f;
        color: #ffffff;
      }

      .password-group {
        display: flex;
        gap: 1em;

        input {
          width: 100%;
        }
      }

      .error {
        color: red;
        font-weight: bold;
        margin-top: 0.1em;
        font-size: 0.9em;
      }
    }

    .create-account-button {
      padding: 0.8em;
      background-color: #5b8df4;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin: 1em 0;
      width: 10em;
      transition:
        background-color 0.3s ease,
        transform 0.1s ease;

      &:hover {
        background-color: #4b76e2;
      }
    }

    .or {
      text-align: center;
      margin: 0.2em 0;
      color: #999;
      font-size: 0.9rem;
    }

    .social-register {
      display: flex;
      gap: 1em;
      justify-content: center;

      .google-button,
      .apple-button {
        display: flex;
        flex: 1;
        padding: 0.8em;
        background-color: #444;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        cursor: pointer;
        margin-top: 0.7em;
        width: 10em;
        transition:
          background-color 0.3s ease,
          transform 0.1s ease;

        &:hover {
          background-color: #555;
        }

        .icon-google {
          font-size: 1.2em;
          margin-right: 1em;
          margin-bottom: 0.1em;
        }

        .icon-apple {
          font-size: 1.5em;
          margin-right: 1em;
          margin-bottom: 0.1em;
        }
      }
    }
  }
}
</style>
