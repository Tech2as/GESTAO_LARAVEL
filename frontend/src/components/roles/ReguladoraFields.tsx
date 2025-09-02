import { Field, ErrorMessage, useFormikContext } from "formik";

export default function ReguladoraFields() {
      const { values } = useFormikContext<any>();
  if (values.role !== "reguladora") return null;

  return (
    <div>
      <div className="mb-3">
              <label htmlFor="email">Nome</label>
               <Field
                type="text"
                name="name"
                placeholder="Insira um nome"
                className="form-control rounded-0"
              />
                <ErrorMessage
                component="div"
                className="text-danger"
                name="name"
              />
              </div>

              <div className="mb-3">
              <label htmlFor="email">CPF</label>
               <Field
                type="text"
                name="cpf"
                placeholder="Insira um CPF"
                className="form-control rounded-0"
              />
                <ErrorMessage
                component="div"
                className="text-danger"
                name="cpf"
              />
              </div>

              <div className="mb-3">
            <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Insira um email"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="email"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password">Senha</label>
              <Field
                type="password"
                name="password"
                placeholder="Insira uma senha"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>
</div>
      );
}