from flask import *
from database import init_db
import models
from quizmanage import *
import config

app = Flask(__name__)
app.config.from_object('config.Config')
init_db(app)
qmng = QuizManage()


@app.route('/', methods=['GET', 'POST'])
def index():
    qmng.new_quiz()
    return render_template('index.html')


@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    if request.method == "POST":
        ans = request.form['ans']
        result, quiz_num, problem = qmng.judge(ans)
        return render_template('quiz.html', answered=True, quiz_num=quiz_num, problem=problem, ans=ans, result=result)
    else:
        quiz_num, problem = qmng.get_next_quiz()
        return render_template('quiz.html', answered=False, quiz_num=quiz_num, problem=problem)


@app.route('/result', methods=['GET'])
def result():
    total = qmng.get_correct_total()
    return render_template('result.html', total=total)


@app.route('/registerquiz', methods=['GET', 'POST'])
def registerquiz():
    if request.method == "POST":
        problem = request.form['problem']
        correct = int(request.form['correct'])

        qmng.register_quiz(problem, correct)

        return render_template('registerquiz.html')
    else:
        return render_template('registerquiz.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        userID = request.form['userID']
        passwd = request.form['passwd']

        return render_template('login.html', userID=userID, passwd=passwd)
    else:
        return render_template('login.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
