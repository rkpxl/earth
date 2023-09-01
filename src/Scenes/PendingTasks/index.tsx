import React from 'react'
import TasksTable from '../../Components/Common/TasksTable'
import { GetStaticPaths, GetStaticProps } from 'next';

const PendingTasks = () : JSX.Element => {
    return (<><TasksTable title="Pending Tasks" type="pending" /></>)
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: any[] = [];

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params } : any) => {
    return {
        props: {},
    };
}

export default PendingTasks;