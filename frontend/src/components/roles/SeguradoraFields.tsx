import { Field, ErrorMessage, useFormikContext } from "formik";

export default function SeguradoraFields() {

    const { values } = useFormikContext<any>();

  if (values.role !== "seguradora") return null;

  return (
    <div>

           <div className="mb-3">
            <label htmlFor="nome_fantasia">Razão Social</label>
              <Field
                type="text"
                name="nome_fantasia"
                placeholder="Insira o nome da seguradora"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="nome_fantasia"
              />
            </div>

            <div className="mb-3">
            <label htmlFor="nome_fantasia">CNPJ</label>
              <Field
                type="text"
                name="cnpj"
                placeholder="Insira o CNPJ da sua seguradora"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="cnpj"
              />
            </div>

             <div className="mb-3">
            <label htmlFor="nome_fantasia">Telefone</label>
              <Field
                type="text"
                name="telefone"
                placeholder="Insira o telefone da sua seguradora"
                className="form-control rounded-0"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="telefone"
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