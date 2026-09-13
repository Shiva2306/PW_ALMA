
pipeline {
    agent any

    tools {
        jdk 'JDK-21'
    }

    // Runs automatically every day at 10:00 PM
    triggers {
        cron('0 22 * * *')
    }

    parameters {

        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'qa', 'staging', 'prod'],
            description: 'Select Environment'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select Browser'
        )

        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'sanity', 'regression', 'master', 'datadriven'],
            description: 'Select Test Suite'
        )
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }

    stages {

        stage('Verify Environment') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'java -version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node Packages..."
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright Browsers..."
                bat 'npx playwright install'
            }
        }

        stage('Approval Before Production') {

            when {
                expression {
                    params.ENVIRONMENT == 'prod'
                }
            }

            steps {
                input(
                    message: "Execute Production Tests?",
                    ok: "Continue"
                )
            }
        }

        stage('Run Playwright Tests') {

            steps {

                script {

                    def grepCommand = ''

                    if (params.TEST_SUITE != 'all') {
                        grepCommand = "--grep @${params.TEST_SUITE}"
                    }

                    echo "======================================="
                    echo "Environment : ${params.ENVIRONMENT}"
                    echo "Browser     : ${params.BROWSER}"
                    echo "Suite       : ${params.TEST_SUITE}"
                    echo "======================================="

                    bat """
                        set ENV=${params.ENVIRONMENT}
                        npx playwright test --project=${params.BROWSER} ${grepCommand}
                    """
                }
            }
        }
    }

    post {

        always {

            echo "======================================="
            echo "PUBLISHING TEST REPORTS"
            echo "======================================="

            script {

                // Publish Playwright HTML Report
                if (fileExists('playwright-report/index.html')) {

                    echo "Playwright HTML report found."

                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])

                } else {

                    echo "WARNING: Playwright HTML report was not generated."
                }


                // Publish Allure Report using Jenkins Allure Plugin
                if (fileExists('allure-results')) {

                    echo "Allure results folder found."
                    echo "Generating and publishing Allure report..."

                    allure([
                        includeProperties: false,
                        jdk: 'JDK-21',
                        results: [[path: 'allure-results']]
                    ])

                } else {

                    echo "WARNING: allure-results folder was not generated."
                }
            }


            // Archive raw Allure result files
            archiveArtifacts(
                artifacts: 'allure-results/**',
                allowEmptyArchive: true
            )
        }


        success {

            echo "======================================="
            echo "PIPELINE EXECUTED SUCCESSFULLY"
            echo "======================================="
        }


        failure {

            echo "======================================="
            echo "PIPELINE EXECUTION FAILED"
            echo "======================================="
        }
    }
}