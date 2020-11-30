import React, { FC } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'urql';

// TODO:usernameからユーザーIDを取得するクエリを書き、
// そのユーザーIDを使ってクイズを登録し、
// ホーム画面に遷移する処理を書く

type Props = {
  content: string;
  answer: boolean;
};

const GetUserIdQuery = gql`
  query($username: String) {
    userByName(name: $username) {
      id
      userId
    }
  }
`;

const QuizCreate = gql`
  mutation($content: String!, $correct: Boolean!, $userId: Int!) {
    createQuiz(input: { content: $content, answer: $answer, userId: $userID }) {
      ok
    }
  }
`;

type Response = {
  userByName: {
    userId: number;
    id: string;
  }[];
};

const QuizCreateButton: FC<Props> = ({ content, answer }) => {
  const [res, executeMutation] = useMutation(QuizCreate);
  const username = localStorage.getItem('username');
  const [result] = useQuery({ query: GetUserIdQuery, variables: { username } });

  const submit = React.useCallback(async () => {
    if (result.fetching) {
      throw new Error('Is suspense mode deactivated?');
    }
    if (result.error) {
      return <h1>{result.error.message}</h1>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ResponseUserId: Response = result.data;
    console.log(ResponseUserId);

    return executeMutation({ content, answer });
  }, [executeMutation, content, answer, result]);

  return (
    <Button disabled={res.fetching} onClick={submit} type="primary">
      Submit
    </Button>
  );
};

export default QuizCreateButton;
