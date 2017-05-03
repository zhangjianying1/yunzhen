import React from 'react';
import PreventImg from '../../components/scrollload/PreventImg';

require('./about.scss');

export default class AboutYUNZHEN extends React.Component{
    render(){

        return(
            <PreventImg>
                <dl className="about">
                    <dt className="a-Y-logo"></dt>
                    <dd className="understand-Y">
                        <strong>了解有求云诊</strong>
                        <p className="font-english">LEARN REGCHM CLOUD CLINIC</p>
                        <a href="javascript:;" className="icon icon-and"></a>
                    </dd>
                    <dd className="function-Y">
                        <h3>领先健康管理医疗平台</h3>
                        <img id="./images/aboutYUNZHEN/function.jpg" />
                    </dd>

                    <dd>
                        <img id="./images/aboutYUNZHEN/aboutY-2.jpg" />
                        <p className="des">有求云诊是两位世界顶尖的诊断科学家携手4位人工智能高级工程师共同开发人工智能诊断软件，有求云诊（REGHM）是一家在全球处于领先地位健康诊断保健信息服务公司，我们立志于为人们提供全面健康管理服务，让每一个享受到精准医疗服务，我们致力于不断研究、开发和推广人工智能医疗科技服务，以帮助人们治愈疾病，减轻病痛和提高生活质量，我们期望以优良的业绩回报投资者，并且奖励为公司贡献智慧和力量的人。
                            </p>
                        <img id="./images/aboutYUNZHEN/aboutY-3.jpg" />
                        <div className="des">
                            <p>
                            我们将为世界各地的医疗工作者和用户提供所需的医疗科技信息服务。公司将会以多种不同语言和信息媒介为上百个国家和地区的医疗工作者及公众提人工智能诊断工具和生态医疗服务支持，更为临床决策辅助信息，医疗新闻和保健常识教育资料。</p>

                            <p>我们的主要产品为针对用户和医疗专业人士的健康筛查工具，有求云诊（REGHM）的创始合伙人在全球从事医疗、保健教育和市场推广已近25年，侧重于提供精准微观诊断、精准治疗疑难杂症、癌症治疗，不断自我提升的信息需求，并为用户普及医疗常识。</p>

                            <p>有求云诊（REGHM） 是未来将是内容丰富全面，形式多种多样，信息及时更新的医疗信息资源，提供准确、趋时、方便查询的个人健康管理信息。</p>
                        </div>
                        <img id="./images/aboutYUNZHEN/aboutY-4.jpg" />

                        <div className="des">
                            <p>有求云诊最大的一个好处就是：更早、更快、更精准地诊断筛查出身体疾病。 有了智能手机拍摄的照片和开发出的人工智能增强算法，
                            这款应用可以让任何一个医生都更好地诊断身体疾病。比如，有了这款 App ，世界上的任何用户及医生都可以更好地诊断身体疾病。有求云诊通过人工智能诊断癌症，尤其是肿瘤体质和6大癌症筛查的应用已经出现。
                            </p>
                            <p>
                            有求云诊在现有医疗应用之中，它使用了云人工智能技术，利用手机摄像头进行“脸部摄影（Face Photography）”，检测人体病理特征。
                            这款应用可以让患者通过简单数字摄像头拍摄的“脸部摄影（FP）”，进行自我身体检查。即将用户可以自行下载应用和解释说明到任何带有数字摄像头的设备上。</p>

                            <p>一旦病人用户将他或她的 “脸部摄影” 图像上传到他们在REGHM Cloud Diagnosis云服务器的私有文件，以便存储和预览，
                                那么，REGHM Cloud Diagnosis平台就会（1）将图像与病人文件中的任意历史图像进行比对，同时也和公司数据库相关的图像进行比对；
                                （2）更新病人的文件，创建一个数据要点摘要，列出和病人疾病图像紧急相关的数据，以及任何可疑的图像变化的预警信息；
                                （3）通知相关医生获取、审阅打印好的病人的数据图表和全身疾病图像。它会自动地匹配云服务器40年的病理病理形态学特征数据已知疾病图像以及病人的历史图像。
                                这项技术极大地增强了医生及病人检测身体疾病的精准度和速度。</p>
                        </div>
                        <img id="./images/aboutYUNZHEN/aboutY-5.jpg" />

                        <p className="des">98%的疾病、癌症及肿瘤体质都是在头部病理形态学发现的，另外2%是在病变血液中发现的。
                            所以，拍照追踪疾病病理形态学的成长过程，很有用，这也是内科医生通过身体摄影正在做的事情。
                            “问题在于时间、金钱、准确性以及病人是否接触的到，因为比较图片的唯一手段就是肉眼和人工，这也是这款应用的给力之处”，
                            有求云诊“以耳医学疾病现象反射定位技术”为基础，我们利用机器学习，大数据和人工智能来预防肿瘤癌症和其他身体疾病。</p>


                    </dd>
                </dl>
            </PreventImg>
        )
    }
}