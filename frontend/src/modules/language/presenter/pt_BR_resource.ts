import { LocaleResource } from "../domain";

export const ptBR_Resource: LocaleResource = {
  login: {
    title: 'Boas-vindas de volta!',
    subtitle: 'Estamos muito animados em te ver novamente!',
    emailInputLabel: 'E-mail',
    passwordInputLabel: 'Senha',
    forgotPasswordButtonLabel: 'Esqueceu a senha?',
    logInButtonLabel: 'Entrar',
    dontHaveAnAccount: 'Precisando de uma conta?',
    signUpButtonLabel: 'Registre-se',
  },
  register: {
    title: 'Criar uma conta',
    emailInput: {
      label: 'E-mail',
      missingEmail: 'Digite um e-mail',
      invalidEmail: 'Digite um e-mail válido',
    },
    nameInput: {
      label: 'Nome exibido',
      invalidName: 'Digite um nome válido',
    },
    usernameInput: {
      label: 'Nome de usuário',
      missingUsername: 'Digite um nome de usuário',
      invalidUsername: 'Digite um nome de usuário válido',
    },
    passwordInput: {
      label: 'Senha',
      missingPassword: 'Digite uma senha',
      invalidPassword: 'Digite uma senha válida',
    },
    birthdayInput: {
      label: 'Data de nascimento',
      missingBirthday: 'Preencha com a data de nascimento',
      invalidBirthday: 'Preencha com uma data válida',
    },
    newsletterOptionLabel: "(Opcional) Tudo bem me mandar e-mails com atualizações do " +
                  "Discord, dicas e ofertas especiais. Você pode mudar isso a " +
                  "qualquer momento.",
    submitButtonLabel: 'Continuar',
    useTermsAndPrivacyPolicy: {
      partOne: 'Ao se registrar, você concorda com os ',
      useTermsInlineButtonLabel: 'termos de serviço',
      partTwo: ' e a ',
      privacyPolicyInlineButtonLabel: 'política de privacidade',
      partThree: ' do Discord.',
    },
    alreadyHasAnAccountButtonLabel: 'Já tem uma conta?',
  },
  directMessages: {
    recentChatsTabTitle: 'Mensagens diretas',
  },
  addGuildDialog: {
    title: 'Personalize o seu servidor',
    subtitle:'Deixe seu novo servidor com a sua cara dando um nome e um ícone a ele. Se quiser, é possível mudar depois.',
    uploadPictureLabel: 'Upload',
    inputDefaultValue: 'Servidor de ',
    inputLabel: 'Nome do servidor',
    inputHelperText: {
      partOne: 'Ao criar um servidor, você concorda com as ',
      linkLabel: 'diretrizes da comunidade',
      partTwo: ' do Discord',
    },
    inputErrorMessages: {
      missingGuildName: 'Digite o nome do servidor',
      missingGuildPicture: 'Adicione um ícone ao servidor',
    },
    dismissButtonLabel: 'Voltar',
    submitButtonLabel: 'Criar',
  },
  newDMPopup: {
    title: 'Selecionar amigos',
    youCanAddMoreXFriends: {
      partOne: 'Você pode adicionar mais ',
      partTwo: ' amigos',
    },
    inputPlaceholder: 'Digite o nome de usuário de um amigo',
    confirmButtonLabel: 'Criar DM',
  },
  friendsSection: {
    topBar: {
      friends: 'Amigos',
      filters: {
        online: 'Disponível',
        all: 'Todos',
        pending: 'Pendente',
        blocked: 'Bloqueado',
      },
      addFriendButtonLabel: 'Adicionar amigo',
    },
    searchInputPlaceholder: 'Buscar',
    friendsCount: {
      online: 'Online — ',
      all: 'Todos os amigos — ',
      pending: 'Pendente — ',
      blocked: 'Bloqueado — ',
    },
  },
  tooltips: {
    message: 'Mensagem',
    more: 'Mais',
  },
};