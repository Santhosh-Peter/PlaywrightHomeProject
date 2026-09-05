def getValueFromVarsFile(String fileName, String key) {
    def content = readFile(fileName)

    for(String line : content.readLines()) {
        if((line) && !line.startsWith("#") && line.contains("=")) {

            def lineParts = line.split("=")

            if(lineParts[0].trim()== key) {
                return lineParts[1].trim()
            }
        }
    }
    return "nothing"
}

pipeline {
    agent any

    environment {
        RANDOMTEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        RUN_ENVIRONMENT = 'Home'

    }

    parameters {
        string(name : 'GitUserName', description : 'Username to login to GitHub', defaultValue : 'Santhosh-Peter')
        choice(name : 'RunTests', choices : ['Yes', 'No'], description : 'Do you want to run the tests?')
    }
    
    stages {
        stage("Get code from repo") {

            when {
                expression {
                    env.RUN_ENVIRONMENT == 'Home'
                }
            }
            steps{
                echo "Getting code from GitHub repository"
                git branch: 'forJeankins', url: 'https://github.com/Santhosh-Peter/PlaywrightHomeProject.git'
                // echo "The Git branch name is : ${BRANCH_NAME}"
                echo "The build number is : ${BUILD_NUMBER}"
                echo "The Jenkins owrkspace is :  ${WORKSPACE}"
                echo "Good Job! Keep going. Here is your random text : ${env.RANDOMTEXT}"
            }
        }

        stage("Get value from vars file") {
            steps{
                echo "Getting value from vars file"
                script{
                    def value = getValueFromVarsFile('variables.txt', 'myName')
                    echo "The value of myName is : ${value}"
                }
                
            }
        }

        stage ("Install node dependencies") {
            when {
                expression {
                    params.GitUserName == 'Santhosh-Peter'
                }
            }
            steps{
                echo "Installing node dependencies"
                bat 'npm ci'
            }
        }
        stage("Install Playwright deps") {
            steps{
                echo "Installing Playwright dependencies"
                bat 'npx playwright install chromium'
                echo "Playwright dependencies installed successfully"
            }
        }
        stage("Execute test") {
            when {
                expression {
                    params.RunTests == 'Yes'
                }
            }
            steps{

                script {
                    env.termToSearch = getValueFromVarsFile('variables.txt', 'termToSearch')
                }
                echo "Executing Playwright tests"
                bat 'npx playwright test tests/nps.spec.ts --project=chromium --workers=3'
                echo "Playwright tests execution completed"
            }
        }
        
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success { echo 'Playwright tests passed!' }
        failure { echo 'Playwright tests failed!' }
    }
    
    
}