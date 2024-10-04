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