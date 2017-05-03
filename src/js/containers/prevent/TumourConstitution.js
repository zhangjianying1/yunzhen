import React from 'react';
import PreventImg from '../../components/scrollload/PreventImg';
require('./preventItems.scss');


export default class TumourConstitution extends React.Component{
    render(){
        "use strict";
        return(
            <PreventImg>
            <dl className="disease-description">
                <dt>
                    <img id="./images/prevent/tumourconstitution.jpg" />
                </dt>
                <dd className="des">

                    <h3>肿瘤病人的机体内环境具有三大特征</h3>
                    <p>特征一：微生态失衡，体内毒素及致癌物质长期堆积，不能及时排出体外，日积月累，造成正常细胞不断发生“癌变”。</p>
                    <p>特征二：免疫失衡，“癌变”的细胞越来越多，机体的免疫细胞却不能及时进行消灭，造成肿瘤越来越大。</p>
                    <p>特征三：营养代谢失衡，正常组织及器官不能得到合理的营养，造成功能失调，最后导致器官衰竭。</p>
                    <p>特征四：与遗传因素有关，也就是说存在某种遗传缺陷，对肿瘤的易感性比较高。改善体质起不了作用的。只能尽量避免接触可能致癌的因素，定期体检。</p>


                    <p className="mt-14">从长期的临床实践观察，很多人具有肿瘤性体质。所谓肿瘤性体质，就是那些易患肿瘤的体质。这样体质的人患肿瘤的可能性很高，属于易患肿瘤的高危人群。</p>
                </dd>
                <dd>
                    <img id="./images/prevent/tumour-2.jpg" />
                </dd>
                <dd className="des">

                    <h3>什么才算肿瘤性体质?</h3>

                    <p>简单的说，如有以下症状的人就有可能是肿瘤性体质。平时脾气大，易上火，烦躁，胸闷，易在身体上生肿块，女人月经前或平时乳胀，小腹胀，胃胀等体征。有这些

                        体征的人，患肿瘤的几率很高。 肿瘤性体质是怎么产生的？生气上火不得释放，压抑在身体里，久而久之形成了肿块。这从上面的体征上就可以分析得出这样的结论。</p>


                </dd>
                <dd>
                    <img id="./images/prevent/tumour-3.jpg" />
                </dd>
                <dd className="des">

                    <p>中医认为气推动血，气行则血行，气滞则血瘀，瘀久则结成肿块。而气郁气滞则和肝的疏泄失司有着直接的关系。气大则怒，怒则伤肝，肝受伤则失调达，
                        肝的生理功能有着喜调达而恶抑郁的特点。抑郁则化火，肝火上可刑金而伤肺，中可伤脾而生痰浊。</p>

                    <p>又可伤心，使心火盛而致阴伤。从而形成以火毒，痰毒，瘀血交杂的肿瘤。也就是所谓“气是雷烟火炮”   既然肿瘤性体质危害如此之大，那么，如何预防才能不成为肿瘤性体质呢？方法很简单，
                        就是释放或看开。释放就是把不良情绪释放发泄出去，让自己的心情得到调节和恢复。而看开就是在看待让自己不高兴，不喜欢的事情时，学会理解，接受或看透事情的本质。人生短短不过百年不到，有什么事情是看不透的呢。</p>

                    <p className="mt-14">哭也是活，笑也是活。为什么不笑着活下去呢。</p>
                </dd>
            </dl>
                </PreventImg>
        )
    }
}