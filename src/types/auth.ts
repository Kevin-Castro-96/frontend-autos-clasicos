interface LoginFormProps {
  /**
   * Función que se llama cuando el formulario se envía con éxito.
   * Por lo general, recibe los datos del formulario (ej: email y password).
   * @param data Un objeto con los datos del formulario.
   */
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
  error?: string | null;
  onForgotPasswordClick: () => void;
}
interface RegisterFormProps {
  /**
   * Función que se llama cuando el formulario se envía con éxito.
   * Recibe todos los datos necesarios para el registro.
   * @param data Un objeto con los datos del formulario (incluyendo el estado del checkbox).
   */
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => void;
  isLoading: boolean;
  error?: string | null;
  onTermsClick: () => void;
}