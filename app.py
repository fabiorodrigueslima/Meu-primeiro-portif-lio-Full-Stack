from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Página Principal
@app.route('/')
def index():
    return render_template('index.html')

# Rota para receber o formulário de contato
@app.route('/enviar-contato', methods=['POST'])
def enviar_contato():
    # Pega os dados do formulário
    nome = request.form.get('nome')
    email = request.form.get('email')
    telefone = request.form.get('telefone')
    servico = request.form.get('servico')
    mensagem = request.form.get('mensagem')
    
    # Mostra no terminal
    print("\n" + "="*50)
    print("📩 NOVA MENSAGEM DO PORTFÓLIO!")
    print(f"👤 Nome: {nome}")
    print(f"📧 Email: {email}")
    print(f"📱 Telefone: {telefone}")
    print(f"💼 Serviço: {servico}")
    print(f"💬 Mensagem: {mensagem}")
    print("="*50 + "\n")
    
    # Retorna sucesso
    return jsonify({'status': 'success', 'message': 'Mensagem enviada com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)


    Flask==3.0.0