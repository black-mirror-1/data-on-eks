"use strict";(self.webpackChunkdoeks_website=self.webpackChunkdoeks_website||[]).push([[9890],{3905:(e,a,t)=>{t.d(a,{Zo:()=>u,kt:()=>d});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=r.createContext({}),i=function(e){var a=r.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},u=function(e){var a=i(e.components);return r.createElement(p.Provider,{value:a},e.children)},k={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},c=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=i(t),d=n,m=c["".concat(p,".").concat(d)]||c[d]||k[d]||o;return t?r.createElement(m,l(l({ref:a},u),{},{components:t})):r.createElement(m,l({ref:a},u))}));function d(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var o=t.length,l=new Array(o);l[0]=c;var s={};for(var p in a)hasOwnProperty.call(a,p)&&(s[p]=a[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var i=2;i<o;i++)l[i]=t[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},8182:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>p,contentTitle:()=>l,default:()=>k,frontMatter:()=>o,metadata:()=>s,toc:()=>i});var r=t(7462),n=(t(7294),t(3905));const o={sidebar_position:2,sidebar_label:"Spark Operator with YuniKorn"},l="Running Spark jobs with Spark Operator and YuniKorn",s={unversionedId:"spark-on-eks/spark-operator-yunikorn",id:"spark-on-eks/spark-operator-yunikorn",title:"Running Spark jobs with Spark Operator and YuniKorn",description:"Introduction",source:"@site/docs/spark-on-eks/spark-operator-yunikorn.md",sourceDirName:"spark-on-eks",slug:"/spark-on-eks/spark-operator-yunikorn",permalink:"/data-on-eks/docs/spark-on-eks/spark-operator-yunikorn",draft:!1,editUrl:"https://github.com/awslabs/data-on-eks/blob/main/website/docs/spark-on-eks/spark-operator-yunikorn.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"Spark Operator with YuniKorn"},sidebar:"docs",previous:{title:"Introduction",permalink:"/data-on-eks/docs/spark-on-eks/"},next:{title:"AI/ML on EKS",permalink:"/data-on-eks/docs/category/aiml-on-eks"}},p={},i=[{value:"Introduction",id:"introduction",level:2},{value:"Spark Operator",id:"spark-operator",level:2},{value:"Deploying the Solution",id:"deploying-the-solution",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Deploy",id:"deploy",level:3},{value:"Sample Spark Job with Spark Operator",id:"sample-spark-job-with-spark-operator",level:2},{value:"NVMe Ephemeral SSD disk for Spark shuffle storage",id:"nvme-ephemeral-ssd-disk-for-spark-shuffle-storage",level:2},{value:"EBS Dynamic PVC for shuffle storage",id:"ebs-dynamic-pvc-for-shuffle-storage",level:2},{value:"Apache YuniKorn Gang Scheduling with NVMe based SSD disk for shuffle storage",id:"apache-yunikorn-gang-scheduling-with-nvme-based-ssd-disk-for-shuffle-storage",level:2},{value:"Example for TPCDS Benchmark test",id:"example-for-tpcds-benchmark-test",level:2},{value:"Cleanup",id:"cleanup",level:2}],u={toc:i};function k(e){let{components:a,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},u,o,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"running-spark-jobs-with-spark-operator-and-yunikorn"},"Running Spark jobs with Spark Operator and YuniKorn"),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("p",null,"In this post, we will learn to build, configure and deploy highly scalable EKS Cluster with Open source ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/GoogleCloudPlatform/spark-on-k8s-operator"},"Spark Operator")," and ",(0,n.kt)("a",{parentName:"p",href:"https://yunikorn.apache.org/"},"Apache YuniKorn")," batch scheduler."),(0,n.kt)("h2",{id:"spark-operator"},"Spark Operator"),(0,n.kt)("p",null,"The Kubernetes Operator for Apache Spark aims to make specifying and running Spark applications as easy and idiomatic as running other workloads on Kubernetes."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a SparkApplication controller that watches events of creation, updates, and deletion of SparkApplication objects and acts on the watch events,"),(0,n.kt)("li",{parentName:"ul"},"a submission runner that runs spark-submit for submissions received from the controller,"),(0,n.kt)("li",{parentName:"ul"},"a Spark pod monitor that watches for Spark pods and sends pod status updates to the controller,"),(0,n.kt)("li",{parentName:"ul"},"a Mutating Admission Webhook that handles customizations for Spark driver and executor pods based on the annotations on the pods added by the controller,"),(0,n.kt)("li",{parentName:"ul"},"and also a command-line tool named sparkctl for working with the operator.")),(0,n.kt)("p",null,"The following diagram shows how different components of Spark Operator add-pn interact and work together."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"img.png",src:t(8136).Z,width:"960",height:"540"})),(0,n.kt)("h2",{id:"deploying-the-solution"},"Deploying the Solution"),(0,n.kt)("p",null,"In this ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/awslabs/data-on-eks/tree/main/analytics/terraform/spark-k8s-operator"},"example"),", you will provision the following resources required to run Spark Jobs with open source Spark Operator and Apache YuniKorn."),(0,n.kt)("p",null,"This example deploys an EKS Cluster running the Spark K8s Operator into a new VPC."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Creates a new sample VPC, 3 Private Subnets and 3 Public Subnets"),(0,n.kt)("li",{parentName:"ul"},"Creates Internet gateway for Public Subnets and NAT Gateway for Private Subnets"),(0,n.kt)("li",{parentName:"ul"},"Creates EKS Cluster Control plane with public endpoint (for demo reasons only) with one managed node group"),(0,n.kt)("li",{parentName:"ul"},"Deploys Metrics server, Cluster Autoscaler, Spark-k8s-operator, Apache Yunikorn and Prometheus server."),(0,n.kt)("li",{parentName:"ul"},"Spark Operator is a Kubernetes Operator for Apache Spark deployed to ",(0,n.kt)("inlineCode",{parentName:"li"},"spark-operator")," namespace. The operator by default watches and handles ",(0,n.kt)("inlineCode",{parentName:"li"},"SparkApplications")," in all namespaces.")),(0,n.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,n.kt)("p",null,"Ensure that you have installed the following tools on your machine."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html"},"aws cli")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://Kubernetes.io/docs/tasks/tools/"},"kubectl")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://learn.hashicorp.com/tutorials/terraform/install-cli"},"terraform"))),(0,n.kt)("h3",{id:"deploy"},"Deploy"),(0,n.kt)("p",null,"Clone the repository"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/awslabs/data-on-eks.git\n")),(0,n.kt)("p",null,"Navigate into one of the example directories and run ",(0,n.kt)("inlineCode",{parentName:"p"},"terraform init")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"cd data-on-eks/analytics/terraform/spark-k8s-operator\nterraform init\n")),(0,n.kt)("p",null,"Run Terraform plan to verify the resources created by this execution."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'export AWS_REGION="us-west-2"   # Change according to your needs\nterraform plan\n')),(0,n.kt)("p",null,"Deploy the pattern"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"terraform apply\n")),(0,n.kt)("p",null,"Enter ",(0,n.kt)("inlineCode",{parentName:"p"},"yes")," to apply."),(0,n.kt)("h2",{id:"sample-spark-job-with-spark-operator"},"Sample Spark Job with Spark Operator"),(0,n.kt)("p",null,"Execute sample PySpark Pi job."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  cd analytics/terraform/spark-k8s-operator/examples\n  kubectl apply -f pyspark-pi-job.yaml\n")),(0,n.kt)("p",null,"Verify the Spark job status"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  kubectl get sparkapplications -n spark-team-a\n\n  kubectl describe sparkapplication pyspark-pi -n spark-team-a\n")),(0,n.kt)("h2",{id:"nvme-ephemeral-ssd-disk-for-spark-shuffle-storage"},"NVMe Ephemeral SSD disk for Spark shuffle storage"),(0,n.kt)("p",null,"Example PySpark job that uses NVMe based ephemeral SSD disk for Driver and Executor shuffle storage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  cd analytics/terraform/spark-k8s-operator/examples/nvme-ephemeral-storage\n")),(0,n.kt)("p",null,"Update the variables in Shell script and execute"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  ./taxi-trip-execute.sh\n")),(0,n.kt)("p",null,"Update YAML file and run the below command"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  kubectl apply -f nvme-ephemeral-storage.yaml\n")),(0,n.kt)("h2",{id:"ebs-dynamic-pvc-for-shuffle-storage"},"EBS Dynamic PVC for shuffle storage"),(0,n.kt)("p",null,"Example PySpark job that uses EBS ON_DEMAND volumes using Dynamic PVCs for Driver and Executor shuffle storage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  cd analytics/terraform/spark-k8s-operator/examples/nvme-ephemeral-storage\n")),(0,n.kt)("p",null,"Update the variables in Shell script and execute"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  ./taxi-trip-execute.sh\n")),(0,n.kt)("p",null,"Update YAML file and run the below command"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  kubectl apply -f nvme-ephemeral-storage.yaml\n")),(0,n.kt)("h2",{id:"apache-yunikorn-gang-scheduling-with-nvme-based-ssd-disk-for-shuffle-storage"},"Apache YuniKorn Gang Scheduling with NVMe based SSD disk for shuffle storage"),(0,n.kt)("p",null,"Gang Scheduling Spark jobs using Apache YuniKorn and Spark Operator"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  cd analytics/terraform/spark-k8s-operator/examples/nvme-yunikorn-gang-scheduling\n")),(0,n.kt)("p",null,"Update the variables in Shell script and execute"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  ./taxi-trip-execute.sh\n")),(0,n.kt)("p",null,"Update YAML file and run the below command"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  kubectl apply -f nvme-yunikorn-gang-scheduling.yaml\n")),(0,n.kt)("h2",{id:"example-for-tpcds-benchmark-test"},"Example for TPCDS Benchmark test"),(0,n.kt)("p",null,"Check the pre-requisites in yaml file before running this job."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"cd analytics/terraform/spark-k8s-operator/examples/benchmark\n")),(0,n.kt)("p",null,"Step1: Benchmark test data generation"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl apply -f tpcds-benchmark-data-generation-1t\n")),(0,n.kt)("p",null,"Step2: Execute Benchmark test"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"  kubectl apply -f tpcds-benchmark-1t.yaml\n")),(0,n.kt)("h2",{id:"cleanup"},"Cleanup"),(0,n.kt)("p",null,"To clean up your environment, destroy the Terraform modules in reverse order with ",(0,n.kt)("inlineCode",{parentName:"p"},"--target")," option to avoid destroy failures."),(0,n.kt)("p",null,"Destroy the Kubernetes Add-ons, EKS cluster with Node groups and VPC"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},'terraform destroy -target="module.eks_blueprints_kubernetes_addons" -auto-approve\nterraform destroy -target="module.eks_blueprints" -auto-approve\nterraform destroy -target="module.vpc" -auto-approve\n')),(0,n.kt)("p",null,"Finally, destroy any additional resources that are not in the above modules"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"terraform destroy -auto-approve\n")),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"To avoid unwanted charges to your AWS account, delete all the AWS resources created during this deployment")))}k.isMDXComponent=!0},8136:(e,a,t)=>{t.d(a,{Z:()=>r});const r=t.p+"assets/images/spark-operator-6752098849b2e90ded1f19770c70f101.png"}}]);