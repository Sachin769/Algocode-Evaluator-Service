
import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardUi from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
// import runCpp from "./containers/runCpp";
// import runJava from "./containers/runJavaDocker";
// import runPython from "./containers/runPythonDocker";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import submissionQueueProducer from "./producers/submissionQueueProducer";
import apiRouter from "./routes";
import { submission_queue } from "./utils/constant";
import SampleWorker from "./workers/sampleWorker";
import SubmissionWorker from "./workers/submissionWorker";


const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());



app.use("/api", apiRouter);
app.use("/ui", bullBoardUi.getRouter());

app.listen(serverConfig.PORT, () => {
    console.log("Server is Up with Port: ", serverConfig.PORT);
    console.log(`BullBoard dashboard UI is running on: http://localhost:${serverConfig.PORT}/ui`);
    SampleWorker("SampleQueue");
    sampleQueueProducer("SampleJob", {
        name: "Sachin",
        company: "Corewave",
        position: "Nodejs Developer",
        location: "Rohini Sector 7"
    });

    SubmissionWorker(submission_queue);


    //     const code = `x=input()
    //     y=input()
    //     print("value of x is",x)
    //     print("value of y is",y)

    //     `;
    //     const inputCase = `100
    //     200`;
    //     runPython(code, inputCase);

    //     const javaCode = `
    //         import java.util.*;
    //         public class Main{
    //          public static void main(String[] args){
    //            Scanner scn = new Scanner(System.in);
    //            int input  = scn.nextInt();
    //            System.out.println("input value given by user: " + input);
    //            for(int i=0;i<input;i++){
    //              System.out.println(i);
    //            }
    //          }
    //         }
    //     `;
    //     const javaInputCase = `10  
    //     `;
    //     runJava(javaCode, javaInputCase);


    //     const cppCode = `
    //     #include<iostream>
    //     using namespace std;

    //     int main(){
    //      int x;
    //      cin>>x;
    //      cout<<"Value of x is" <<x<<endl;
    //      for(int i=0;i<x;i++){
    //        cout<<i<<" ";
    //      }
    //     cout<<endl;
    //     return 0;
    //     }
    // `;

    //     const cppInputCase = `10
    // `;

    //     runCpp(cppCode, cppInputCase);




    //     const userCode = `

    //     class Solution {
    //       public:
    //       vector<int> permute() {
    //           vector<int> v;
    //           v.push_back(20);
    //           return v;
    //       }
    //     };
    //   `;

    //     const stubCode = `
    //   #include<iostream>
    //   #include<vector>
    //   #include<stdio.h>
    //   using namespace std;

    //   ${userCode}

    //   int main() {

    //     Solution s;
    //     vector<int> result = s.permute();
    //     for(int x : result) {
    //       cout<<x<<" ";
    //     }
    //     cout<<endl;
    //     return 0;
    //   }
    //   `;

    //     const stubCodeInputCase = `10
    //   `;

    //     runCpp(stubCode, stubCodeInputCase);



    const queueInputCase = `20
`;

     const queueUserCode = `

        class Solution {
          public:
          vector<int> permute() {
              vector<int> v;
              v.push_back(20);
              return v;
          }
        };
      `;

        const queueStubCode = `
      #include<iostream>
      #include<vector>
      #include<stdio.h>
      using namespace std;

      ${queueUserCode}

      int main() {

        Solution s;
        vector<int> result = s.permute();
        for(int x : result) {
          cout<<x<<" ";
        }
        cout<<endl;
        return 0;
      }
      `;

    submissionQueueProducer({
        "123": {
            language: "CPP",
            queueInputCase,
            queueStubCode
        }
    });


});