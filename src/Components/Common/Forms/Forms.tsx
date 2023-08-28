import React from 'react'
import { QuestionList } from './QuestionList'
import { useRouter } from 'next/router'


const Forms: React.FC = () : JSX.Element => {
    const router = useRouter()
    const [title, setTitle] = React.useState<string | string[] | undefined>();
    const [dept, setDept] = React.useState<string | string[] | undefined>();
    const [description, setDescription] = React.useState<string | string[] | undefined>();

    React.useEffect(() => {
        // Replace "yourParam" with your actual parameter name
        const { title, dept, description } = router.query
        
        setTitle(title)
        setDept(dept)
        setDescription(description)

        router.push({
            pathname: router.pathname,
            query: {},
        });
      }, []);

    return (
       <>
            <QuestionList title={title} dept={dept} description={description}/>
       </>
    )
}

export default Forms