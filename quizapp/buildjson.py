from flask.json import jsonify


class BuildJSON():
    def build_status(self, userID, login):
        status = {
            "userID": "{}".format(userID),
            "login": "{}".format(login)
        }

        return status

    def build_post_status(self, is_post):
        post_status = {
            "is_post": "{}".format(is_post)
        }

        return post_status

    def build_quiz(self, quizID, problem, correct, userID):
        quiz = {
            "quizID": "{}".format(quizID),
            "problem": "{}".format(problem),
            "correct": "{}".format(correct),
            "userID": "{}".format(userID)
        }

        return quiz

    def build_quiz_info(self, quiz_num, answered, ans, result, total):
        quiz_info = {
            "quiz_num": "{}".format(quiz_num),
            "answered": "{}".format(answered),
            "ans": "{}".format(ans),
            "result": "{}".format(result),
            "total": "{}".format(total)
        }

        return quiz_info

    def build_user(self, userID, passwd):
        user = {
            "userID": "{}".format(userID),
            "passwd": "{}".format(passwd)
        }

        return user
