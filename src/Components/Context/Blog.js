import React from 'react';

const Blog = () => {
    return (
        <div className="my-3 w-10/12 m-auto text-xl ">

            <div >

                <div className="card border border-blue-500 px-2 mx-2">
                    <h1 className="text-center text-pink-400"> What are the different ways to manage a state in a React application?</h1>
                    <ul className=' text-center'>
                        <li>  Local state</li>
                        <li >Global state</li>
                        <li> Server state</li>
                        <li><p> URL state</p></li>

                    </ul>

                </div>
                <div className="card p-2 my-2 border border-blue-500">
                    <h1 className="text-center text-warning">
                        {" "}
                        How does prototypical inheritance work
                    </h1>
                    <h4>
                        When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.
                    </h4> <br /> <br />
                    <h1 className="text-center text-warning">
                        {" "}

                    </h1>

                </div>
                <div className="card p-2 my-2 border border-blue-500">
                    <h1 className="text-center text-warning">
                        {" "}
                        What is a unit test? Why should we write unit tests?
                    </h1>
                    <h4>
                        Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
                        Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                        It simplifies the debugging process.
                        Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
                        Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                        Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
                    </h4>
                </div>
                <div className="card p-2 my-2 border border-blue-500">
                    <h1 className="text-center text-warning">
                        {" "}
                        React vs. Angular vs. Vue?
                    </h1>
                    <h4>
                        1. React JS :
                        React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React.
                        <br /> <br />

                    </h4>
                    <h5 className='text-black my-4'>
                        2. Angular :

                        If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready.

                        Difference between Nodejs and JavaScript :
                    </h5>
                    <h5 className='text-black my-4'>
                        2. Vue :

                        Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage.

                        Difference between Nodejs and JavaScript :
                    </h5>
                </div>
                <div className="card p-2 my-2 ">
                    <h1 className="text-center text-warning">
                        {" "}
                        Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts.
                    </h1>
                    
                </div>
            </div>

        </div>
    );
};

export default Blog;