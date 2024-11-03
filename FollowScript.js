// 🔧 All HTML Elements we need to access

const Followbutton = document.getElementById("Follow-button");
const TicketContent = document.querySelector("textarea");
const Result = document.getElementById("result");
const ticketTitleSpan = document.getElementById("title");
const esclatedOnSpan = document.getElementById("esclate-time");
const closedOnSpan = document.getElementById("close-time");
const problemTypeSpan = document.getElementById("problem-type");
const container = document.querySelector(".system-action-container");

// All Important Data in ticket 📝
let TicketData = {
    Title: "",
    Esclated: "",
    Closed: "",
    Reason: "",
    StartPointCalculate: "",
    EndPointCalculate: "",
    passedSla: false,
    allClosedDates: [],
    totalResolutionHours: 0,
    TicketCode: 0,
    script: "",
    closedState: true,
    valid: true,
    stat: "open",
    SLA: 0,
    reEsclated: false,
    FccDate: [],

}
// Advices scripts 💬

const advices = {
    code2: {
        script: "قول للعميل : (بعد الفحص، تبين أن الخط الخاص بحضرتك يعمل بكفاءة ولا يوجد به أي مشكلة احنا بس دلوقتي محتاجين تأكيد من حضرتك ان المشكلة اتحلت معانا ولا لا)",

        systemActionTrue: [`<p>Create <a class="code-2-name"> </a> Solved sr </p>`, `<p>Close the ticket if still open</p>`,],

        systemActionFalse: [`<p>Re trouble shoot</p>`, `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,


            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`, `Create <a>TTS Case </a> if same problem exists`, `<p>Create <a>Follow Up SR</a></p>`],

        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,

        buttonsContent: ["solved", "not solved", "العميل قالك المشكلة اتحلت", "العميل قالك المشكلة متحلتش"]
    },



    code86: {
        script: "اسأل العميل : (حضرتك غيرت الراوتر ؟ وامشي سيستم اكشن على حسب رد العميل )",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"></a>  CPE problem sr</p> `,

            `<p>Inform the customer to try using another CPE or get a CPE test from the nearest branch.</p>`,
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,


            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["العميل مغيرش الراوتر", "العميل غير الراوتر", " لو العميل مغيرش الراوتر", " لو العميل اكد انه غير الراوتر والمشكلة متحلتش"]
    },

    code87: {
        script: "اسأل العميل : (حضرتك غيرت الأسبلتر ؟ وامشي سيستم اكشن على حسب رد العميل )",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a> Internal wiring sr</p> `,

            `<p>Inform the customer to try using another Splitter.</p>`,
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,


            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["العميل مغيرش الأسبلتر", "العميل غير الأسبلتر", " لو العميل مغيرش الأسبلتر", " لو العميل اكد انه غير الأسبلتر والمشكلة متحلتش"]
    },



    code8: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على الوصلات الداخلية اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a> Internal wiring sr</p> `,
            `<p>Create <a class="code-2-name"> </a> Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },


    code9: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على الوصلات الخارجية اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },


    code12: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على الوصلات الخارجية اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },


    code10: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على الوصلات الداخلية اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a> Internal wiring sr</p> `,
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },
    // code 13

    code13: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على البوكس اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },

    // code 11

    code11: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت على الكابينة اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },
    // code 14

    code14: {
        script: "قول للعميل ان فيه اصلاحات فنية تمت من جانب السنترال اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },


    // code 18

    code18: {
        script: "قول للعميل ان تم حل المشكلة بعد أعادة تحميل الحرارة اتأكد منه المشكلة اتحلت ولا لا ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },
    // code 35
    code35: {
        script: "قول للعميل ان حصل تركيب بعد تغيير التعاقد ؟",

        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `,



        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", " لو العميل قالك المشكلة متحلتش"]
    },

    code6: {
        script: "تركيب جديد",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code59: {
        script: "تم حل المشكلة بعد تغيير بورت جديد",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code83: {
        script: "وصلات داخلية / لا يمكن حلها",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code20: {
        script: "أعطال جسيمة",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code84: {
        script: "وصلات داخلية / رفض المشترك التعديل",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code81: {
        script: "مشكلة داخل - تحتاج إصلاح أرضية",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code82: {
        script: "مشكلة خارج - تحتاج إصلاح أرضية",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code75: {
        script: "مشكلة سبليتر - لا يوجد سبليتر آخر لدى العميل",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code74: {
        script: "اسأل العميل : (حضرتك غيرت الراوتر ؟ وامشي سيستم اكشن على حسب رد العميل )",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  CPE problem sr</p> `,

            `<p>Inform the customer to try using another CPE or get a CPE test from the nearest branch.</p>`,
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,


            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB`],

        conditional: true,

        buttonsContent: ["العميل مغيرش الراوتر", "العميل غير الراوتر", " لو العميل مغيرش الراوتر", " لو العميل اكد انه غير الراوتر والمشكلة متحلتش"]
    },

    code65: {
        script: "لا يوجد مشكلة بورت خطأ / يحتاج إعدادات راوتر",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code38: {
        script: "مشكلة صواعد",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code17: {
        script: "العميل غير متواجد - الموعد المطلوب فى الملاحظات",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },


    code28: {
        script: "العميل رفض الزيارة - رفض الدخول",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code96: {
        script: "العميل لا يرد",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code26: {
        script: "تفتيش هندسي",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code19: {
        script: "شبكة داخلية - مجتمعات مغلقة",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code29: {
        script: "مشكلة عدة العميل",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code23: {
        script: "مشكلة فواتير خدمة الصوت",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code4: {
        script: "أمر شغل لم يتم",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code30: {
        script: "مرفوع بناء على طلب المشترك",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code7: {
        script: "تعذر تركيبات",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },

    code27: {
        script: "مطلوب تعديل عنوان",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code73: {
        script: "العميل رفض التركيب",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    },
    code24: {
        script: "عدم سداد اكثر من فاتورة",
        systemActionTrue: [
            `<p>Create <a class="code-2-name"> </a>  Solved sr</p> `,
            `<p>Close the ticket if it still open</p> `
        ],
        systemActionFalse: [
            `<p>Re trouble shoot</p>`,

            `<p>if problem solved within the troubleshoot and creat sr based on how solved it </p>`,

            `<p style="text-align: center; font-weight: bold; color:#ff003b">In case of escalation:</p>`,

            `<P>if not solved Re esclate the ticket again if didn't pass 5 inform  sla "24h<p>`,

            `Create <a>TTS Case </a> if same problem exists`
        ],
        systemActionMobile: [`<p>Offer 015: We Mobile Concession 3GB</p>`],
        conditional: true,
        buttonsContent: ["Solved", "Not solved", "لو العميل قالك المشكلة اتحلت", "لو العميل قالك المشكلة متحلتش"]
    }
};


// All possible scripts 🧾
const scripts = {
    within: {
        script: `Inform the customer that the ticket is still within SLA and will be resolved within <span class="sla">24 hours</span> from the time it was escalated.`,
        action: [`<p>Create Follow up within sla SR </p>`]
    },
    Passed: {
        script: "Inform the customer that the ticket has exceeded the SLA. Let them know you will escalate it as a delayed ticket and personally follow up on it to provide further updates.",
        action: [`<p>Create Follow up after Sla Sr</p>`, `<p>Create Delayed Ticket IR if not found", "Create Follow-up IR </p>`, `<p>Create Follow up sr</p>`, "<p>Offer 015: We Mobile Concession In case of the ticket was (BLQ / Physical instability)</p>"]
    },
    reEsclateWithin:
    {
        script: `This is Re esclated ticket within Sla Inform the customer about the fixes on his line and let him know that the ticket eslcated again to iu and they currently Working on it `,

        action: [`<p>Follow Up after Re-Escalation Within SLA </p>`, `<p>Create Delayed Ticket IR if not found</p>`, `<p> Create Follow up SR </p>`]
    },

    reEsclateAfter: {
        script: `This is Re esclated ticket After Sla Inform the customer about the fixes on his line and let him know that the ticket eslcated again to iu and they currently Working on it `,

        action: [`<p>Follow Up after Re-Escalation After SLA</p>`, `<p>Create Delayed Ticket IR if not found</p>`, `<p>Create Follow Up IR</p><p>If the case was (BLQ / Physical intstiblitly) Offer 015 We mobile Concession`]
    },
    FCC: {
        script: `This ticket is in follow Up Pool `,
        
        action: [`<p> If still the same problem create tts case</p>`, `<p>Create Re Esclation SR</p>`, `<p class="red-warn">If Diffrent Case (as per Customer input) </p>`, ` <p>Create TTS Case</p>`, `<p> Create Sr Depend on Customer case </p>`]

    }







}
// <-------------------------------------------------------------------Supporter Functions 🛠 ------------------------------------------------------------------->


// 🗓️ <-------------------------------------------------------------Change the format of date -------------------------------------------------------------------> 🗓️
function formatDateToCustomString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 as 12 AM
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
}

// 🔄 <-------------------------------------------------------------Reset the data ------------------------------------------------------------------->🔄
function resetTicketData() {
    TicketData.Title = "";
    TicketData.Esclated = "";
    TicketData.Closed = "";
    TicketData.Reason = "";
    TicketData.StartPointCalculate = "";
    TicketData.EndPointCalculate = "";
    TicketData.passedSla = false;
    TicketData.allClosedDates = [];
    TicketData.totalResolutionHours = 0;
    TicketData.TicketCode = 0;
    TicketData.script = "within";
    TicketData.closedState = true;
    TicketData.valid = true;
    TicketData.stat = "open"
}
// 🔗<-------------------------------------------------------------Add function to links ------------------------------------------------------------------->🔗
function addLinkEventListeners() {
    const links = container.querySelectorAll('a[data-label]');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            const label = this.getAttribute('data-label');
            localStorage.setItem('systemAction', label); // Store in local storage
            window.open("./action.html", "_blank");
        });
    });
}
// 🚀<------------------------------------------------------------------------Main Functions-------------------------------------------------------------------->🚀


// 🗓️----------------------------------------------------------------------Get & Store Last transfer date function -------------------------------------------------->🗓️
function getTransferedDate() {
    // Define a regex pattern to find dates in the format "DD-MM-YYYY, HH:MM AM/PM"
    const dateRegex = /\d{2}-\d{2}-\d{4}, \d{2}:\d{2} [APM]{2}/g;
    let match;
    const dates = [];

    // Extract all matching dates from the TicketContent value and store them with their positions
    while ((match = dateRegex.exec(TicketContent.value)) !== null) {
        dates.push({ date: match[0], index: match.index });
    }


    // Variables to track the last "Transfered: IU Maintenance" or "Transfered: NOC" position and its closest preceding date
    let lastTransferPosition = -1;
    let esclationDate = "no close code";

    // Find all occurrences of "Transfered: IU Maintenance"
    let transferPosition = TicketContent.value.indexOf("Transfered: IU Maintenance");
    TicketData.SLA = 24


    // If "Transfered: IU Maintenance" is not found, look for "Transfered: NOC"
    if (transferPosition === -1) {
        transferPosition = TicketContent.value.indexOf("Transfered: NOC");
        TicketData.SLA = 5
    }

    while (transferPosition !== -1) {
        lastTransferPosition = transferPosition;
        transferPosition = TicketContent.value.indexOf("Transfered: IU Maintenance", transferPosition + 1);
    }

    // If dates were found and a transfer occurrence was found
    if (dates.length > 0 && lastTransferPosition !== -1) {
        for (let i = 0; i < dates.length; i++) {

            if (dates[i].index < lastTransferPosition) {
                esclationDate = dates[i].date; // Update to the latest preceding date


            } else {
                break;
            }

        }

        TicketData.Esclated = true;  // Transfer found, so set to true
    } else if (dates.length > 0) {
        // No transfer found, but dates are present, so use the first date
        esclationDate = dates[0].date;
        TicketData.Esclated = false; // No transfer found, so set to false
    }
    TicketData.StartPointCalculate = esclationDate;
}

//----------------------------------------------------------------------End Get & Store Last transfer date function ---------------------------------------------------------------------





//🗓️----------------------------------------------------------------------Get & Store Last Close date function---------------------------------------------------------------------🗓️
function getClosedCode() {
    // Define a regex pattern to find "Close Code"
    const closeCodePattern = /\bClose Code\s*\((\d+)\)/g;

    // Find all matches of the close code pattern
    const closedCodeMatches = [...TicketContent.value.matchAll(closeCodePattern)];


    // If no close code is found, set EndPointCalculate to false and return
    if (closedCodeMatches.length === 0) {
        TicketData.closedState = false;
        TicketData.EndPointCalculate = formatDateToCustomString(new Date())

        return;
    }

    // Initialize an array to store valid matches
    let filtered = [];

    // Iterate through all found matches
    for (const match of closedCodeMatches) {
        const code = parseInt(match[1], 10); // Extract the numeric code and convert it to an integer
        filtered.push(match); // Add the match to the filtered array
    }

    // Get the index of the last valid close code match
    const index = filtered[filtered.length - 1].index;

    // Extract the words following the last match (slice the content after the index, split into words, take the next 10 words)
    const validDate = TicketContent.value.slice(index).split(/\s+/).slice(2, 12).join(' ');

    // Define a regex pattern to match dates in the format "DD-MM-YYYY, HH:MM AM/PM"
    const dateRegex = /(\d{2})-(\d{2})-(\d{4}),\s*(\d{1,2}):(\d{2})\s*([AP]M)/;

    // Find the date match within the extracted words
    const dateMatch = dateRegex.exec(validDate);

    // Store the matched date in TicketData.EndPointCalculate, or set to false if no date is found
    TicketData.EndPointCalculate = dateMatch ? dateMatch[0] : false;
    if (TicketContent.value.includes("Status Changed: Closed")) {
        TicketData.stat = "closed"
    }

}


//----------------------------------------------------------------------End of Get & Store Last Close date function ---------------------------------------------------------------------





//🏷️----------------------------------------------------------------------start of Get & Store Ticket Title function -----------------------------------------------------------🏷️


function getTicketTitle() {
    const titleRegex = /Ticket Info: Ticket Title is ([^\n]+)/;
    const titleMatch = titleRegex.exec(TicketContent.value);
    const ticketTitle = titleMatch ? titleMatch[1].trim() : "No ticket title found";
    TicketData.Title = ticketTitle
}
//----------------------------------------------------------------------end of Get & Store Ticket Title function ---------------------------------------------------------------------




//❓----------------------------------------------------------------------Start of Get & Store cause of the problem function ---------------------------------------------------------❓

function GetProblemReason() {
    // extract Words after close code
    const closedTime = /\bClose Code\b/g;
    const closedTimeMatches = [...TicketContent.value.matchAll(closedTime)];

    // extract Words after close code
    const index = closedTimeMatches.length > 0 ? closedTimeMatches[closedTimeMatches.length - 1].index : null
    const wordsAfter = TicketContent.value.slice(index).split(/\s+/).slice(2, 12).join(' ');
    function extractWordsAfterCloseCode(text) {
        const closeCodePattern = /\(\d+\):\s*(.*?)(?=\d{2}-\d{2}-\d{4},\s*\d{1,2}:\d{2}\s*[AP]M)/;
        const match = closeCodePattern.exec(text);
        return match ? match[1].trim() : "No Close code found";
    }
    const details = extractWordsAfterCloseCode(wordsAfter);
    TicketData.Reason = details;
    // scripts.reEsclate.script = `Inform the customer that their ticket has been closed in IU After : ${TicketData.Reason}, but you will reopen it and send it back to IU Maintenance. Offer follow up to provide further updates.`
    const Code = wordsAfter.match(/\(\d+\)/g);
    const codeMatch = wordsAfter.match(/\(\d+\)/g);
    TicketData.TicketCode = codeMatch ? codeMatch[0] : "No Code found";

}
//----------------------------------------------------------------------End of Get & Store cause of the problem function ---------------------------------------------------------------------


//🗓️🗓️----------------------------------------------------------------------Start of converting date format ----------------------------------------------------------------🗓️🗓️
function parseAndStoreDate(dateString) {
    const datePattern = /(\d{2})-(\d{2})-(\d{4}),\s*(\d{1,2}):(\d{2})\s*([AP]M)/;
    const match = datePattern.exec(dateString);

    if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // JavaScript months are 0-indexed
        const year = parseInt(match[3], 10);
        let hour = parseInt(match[4], 10);
        const minute = parseInt(match[5], 10);
        const ampm = match[6];

        // Convert hour to 24-hour format if necessary
        if (ampm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0;
        }

        // Construct the Date object
        const parsedDate = new Date(year, month, day, hour, minute);
        return parsedDate;
    } else {
        const parsedDate = new Date();
        return null;
    }
}
//----------------------------------------------------------------------End of converting date format ---------------------------------------------------------------------


//⏳----------------------------------------------------------------------Start of Calculate  diffrence between dates  ---------------------------------------------------------⏳
function CalculateDiffrence() {
    let TransferDate = new Date(parseAndStoreDate(TicketData.StartPointCalculate));
    let closeDate = new Date(parseAndStoreDate(TicketData.EndPointCalculate));
    // Calculate the difference in milliseconds
    let differenceInMillis = closeDate - TransferDate;
    // Convert milliseconds to hours
    let differenceInHours = differenceInMillis / (1000 * 60 * 60);
    TicketData.totalResolutionHours = differenceInHours;


}
//----------------------------------------------------------------------End  of Calculate  diffrence between dates ---------------------------------------------------------------------


// check re esclated ticket
function checkReEsclation() {
    if (TicketData.totalResolutionHours < 0) {
        TicketData.EndPointCalculate = formatDateToCustomString(new Date())
        TicketData.reEsclated = true;

        CalculateDiffrence()
    }
}
// 🧩----------------------------------------------------------------------Start  of Displaying correct Script Logic ------------------------------------🧩🧩
function validScript() {
    //1-Empty ticket

    const schema = Joi.string().trim().min(1).required();

    const valueToValidate = TicketContent.value.trim();

    const { error, value } = schema.validate(valueToValidate);

    let validTicket = TicketData.Title == "No ticket title found";


    let reEsclated = TicketData.reEsclated === true && TicketData.totalResolutionHours < 24;

    let reEsclatedAfter = TicketData.reEsclated === true && TicketData.totalResolutionHours > 24;

    let PassedSla = TicketData.closedState === false && TicketData.totalResolutionHours > 24 && TicketData.Reason == "No Close code found";

    let withinSla = TicketData.closedState === false && TicketData.totalResolutionHours < 24 && TicketData.Reason == "No Close code found";

    if (error) {
        // Log or handle the error if the field is empty
        console.error('Validation failed:', error.details[0].message);
        alert('The Ticket Content must not be empty.');
        window.location.reload();

    } else {
        if (validTicket) {
            alert("Please enter a valid ticket")
            window.location.reload();
        }
        if (validateFollowup()) {
            TicketData.script = "FCC"

        }

        else if (reEsclated) {
            TicketData.script = "reEsclateWithin"
        }
        else if (reEsclatedAfter) {
            TicketData.script = "reEsclateAfter"
        }

        else if (PassedSla) {

            TicketData.script = "Passed"
        }
        else if (withinSla) {
            TicketData.script = "within"
            console.log(TicketData)
        }
        else {

            TicketData.script = "advice"
        }

    }


}

//----------------------------------------------------------------------End Displaying of correct Script Logic ---------------------------------------------------------------------



//🔍----------------------------------------------------------------------Start of filttering valid reasons function ----------------------------------------------🔍
function filtterCode() {
    const closeCodes = [2, 86, 87, 8, 9, 12, 10, 13, 11, 14, 18, 35, 6, 59, 83, 20, 84, 81, 82, 75, 74, 65, 38, 17, 28, 96, 26, 19, 29, 23, 4, 30, 7, 27, 73, 24]




    closeCodes.forEach((code) => {
        if (`(${code})` == TicketData.TicketCode) {
            TicketData.valid = false;
            if (code == 20) {
                TicketData.SLA = 3
            }
        }
    })

}

//----------------------------------------------------------------------End  of filttering valid reasons function ---------------------------------------------------------------------



//📊📊----------------------------------------------------------------------Start  of Display Data function ---------------------------------------------------------------------📊📊

displayData = function () {
    document.querySelector("h1").classList.add("static");
    ticketTitleSpan.innerHTML = `Case Type : ${TicketData.Title}`;
    esclatedOnSpan.innerHTML = `Ticket esclated ON :  ${TicketData.StartPointCalculate}`;
    problemTypeSpan.innerHTML = `Reason :  ${TicketData.Reason}`;
    TicketData.closedState == true ? closedOnSpan.innerHTML = `Ticket Closed ON :  ${TicketData.EndPointCalculate}` : closedOnSpan.innerHTML = `Current Date :  ${TicketData.EndPointCalculate}`
    let resultHtml;
    const code = `code${TicketData.TicketCode.slice(1, -1)}`; // Generate the dynamic property name
    const pureCode = advices[code]; // Access the corresponding advice
    switch (TicketData.script) {
        case "advice":

            resultHtml = `<span class="action">${pureCode.script}</span>`;

            break;

        case "within":
            resultHtml = `<span class="action">${scripts.within.script}</span>`;
            break;

        case "Passed":
            resultHtml = `<span class="action">${scripts.Passed.script}</span>`;
            break;

        case "reEsclateWithin":
            resultHtml = `<span class="action">${scripts.reEsclateWithin.script}</span>`;
            break;

        case "reEsclateAfter":
            resultHtml = `<span class="action">${scripts.reEsclateAfter.script}</span>`;
            break;

        case "FCC":
            resultHtml = `<span class="action">${scripts.FCC.script}</span>`;
            break;


        default:
            resultHtml = null; // Handle cases where script does not match any known type
            break;
    }

    if (resultHtml) {
        Result.innerHTML = resultHtml;
    }

}

//----------------------------------------------------------------------End  of Display Data function ---------------------------------------------------------------------

//📊----------------------------------------------------------------------Start  of Display System Action function -----------------------------------------------------📊
let flag = 0;

function displaySystemAction() {

    // Convert the EndPointCalculate to a Date object

    let closeDate = new Date(parseAndStoreDate(TicketData.EndPointCalculate));

    let currentDate = new Date();

    let timeDifference = currentDate - closeDate;

    let diffHours = timeDifference / (1000 * 60 * 60);

    let diffDays = diffHours / 24;


    const resultContainer = document.querySelector(".result-container")

    container.innerHTML = `<h1 class="static">System Actions</h1>`;

    container.classList.add("follow");

    if (TicketData.script == "reEsclateWithin") {

        container.innerHTML = `

        <h1 class="static">System Actions</h1>

        ${scripts.reEsclateWithin.action.map(action => `${action}`).join('')}

    `;


    }
    else if (TicketData.script == "reEsclateAfter") {

        container.innerHTML = `
             <h1 class="static">System Actions</h1>

                ${scripts.reEsclateAfter.action.map(action => `${action}`).join('')}
     `;

    }


    else if (TicketData.script == "Passed") {

        container.innerHTML = `
             <h1 class="static">System Actions</h1>

                ${scripts.Passed.action.map(action => `${action}`).join('')}
     `;

    }
    else if (TicketData.script == "within") {

        container.innerHTML = `
             <h1 class="static">System Actions</h1>

                ${scripts.within.action.map(action => `${action}`).join('')}
     `;

    }
    else if (TicketData.script == "FCC") {

        container.innerHTML = `
             <h1 class="static">System Actions</h1>

                ${scripts.FCC.action.map(action => `${action}`).join('')}
     `;

    }


    else {
        let key = `code${TicketData.TicketCode.replace("(", "").replace(")", "")}`;

        let systemActions = advices[key].systemActionTrue;

        let systemActionsNotSolved = advices[key].systemActionFalse;

        let systemActionsWeMobile = advices[key].systemActionMobile;

        let ticketTitle = TicketData.Title.toLocaleLowerCase();


        if (advices[key].conditional) {

            if (flag == 0) {

                resultContainer.innerHTML += `

                <button title="${advices[key].buttonsContent[2]}" class="solved-c-2" style="color: white; border: 1px solid; padding: 0.5rem 1.5rem; margin-top: 1rem;">${advices[key].buttonsContent[0]}</button> 

                <button title="${advices[key].buttonsContent[3]}" class="not-solved-c-2" style="color: white; border: 1px solid; padding: 0.5rem 1.5rem; margin-top: 1rem;">${advices[key].buttonsContent[1]}</button>`;
                flag++
            }
            else {
                return;
            }
        }
        let solvedButton = document.querySelector("button.solved-c-2");

        let notSolvedButton = document.querySelector("button.not-solved-c-2");

        solvedButton.onclick = function () {
            container.innerHTML = `

            <h1 class="static">System Actions</h1>

            ${systemActions.map(action => `${action}`).join('')}

        `;
            document.querySelector(".code-2-name").innerHTML = TicketData.Title


        }

        notSolvedButton.onclick = function () {
            let extraActions = '';

            if (ticketTitle === "blq" || ticketTitle === "bad line quality" || ticketTitle === "physical instability") {

                extraActions = systemActionsWeMobile.map(action => `${action}`).join('');
            }

            container.innerHTML = `
            <h1 class="static">System Actions</h1>

            ${systemActionsNotSolved.map(action => `${action}`).join('')}

            ${extraActions}
        `;
        }
    }
}




function getFollowUpDate() {
    // Define a regex pattern to find "Close Code"
    const fccCode = /\bTransfered: CC-Follow up\b/g;


    // Find all matches of the close code pattern
    const fccCodeMatches = [...TicketContent.value.matchAll(fccCode)];
    // If no close code is found, set EndPointCalculate to false and return
    if (fccCodeMatches.length === 0) {
        TicketData.closedState = false;
        TicketData.EndPointCalculate = formatDateToCustomString(new Date())

        return;
    }

    // Initialize an array to store valid matches
    let filtered = [];

    // Iterate through all found matches
    for (const match of fccCodeMatches) {
        const code = parseInt(match[1], 10); // Extract the numeric code and convert it to an integer
        filtered.push(match); // Add the match to the filtered array
    }

    // Get the index of the last valid close code match
    const index = filtered[filtered.length - 1].index;

    // Extract the words following the last match (slice the content after the index, split into words, take the next 10 words)
    const validDate = TicketContent.value.slice(index).split(/\s+/).slice(2, 12).join(' ');

    // Define a regex pattern to match dates in the format "DD-MM-YYYY, HH:MM AM/PM"
    const dateRegex = /(\d{2})-(\d{2})-(\d{4}),\s*(\d{1,2}):(\d{2})\s*([AP]M)/;

    // Find the date match within the extracted words
    const dateMatch = dateRegex.exec(validDate);
    if (dateMatch != null) {

        TicketData.FccDate = dateMatch[0]
    }
    else {
        TicketData.FccDate = "No fcc"

    }


}

function validateFollowup() {
    if (TicketData.FccDate != "No fcc") {
        let FccDate = new Date(parseAndStoreDate(TicketData.FccDate));
        let TransferDate = new Date(parseAndStoreDate(TicketData.StartPointCalculate));
        let endDate = new Date(parseAndStoreDate(TicketData.EndPointCalculate));
        let currentDate = new Date();
        let isEndDateCurrent = endDate.toDateString() === currentDate.toDateString();
        let latestDate;

        if (!isEndDateCurrent) {
            latestDate = new Date(Math.max(FccDate, TransferDate, endDate));
        } else {
            // If endDate is current, only compare FccDate and TransferDate
            latestDate = new Date(Math.max(FccDate, TransferDate));
        }

        if (latestDate.getTime() === FccDate.getTime()) {
            return true

        } else {
            console.log('FCC date is not the latest.');
        }
    }
    else {
        return
    }

}


//----------------------------------------------------------------------End  of Display System Action  function ---------------------------------------------------------------------

// DISPLAY RIGHT SLA SCRIPT 
function displaySla() {
    if (document.querySelector(".sla") != null) {
        if (TicketData.SLA === 5) {
            document.querySelector(".sla").innerHTML = `2-5 Hours`;
        } else if (TicketData.SLA === 24) {
            document.querySelector(".sla").innerHTML = `24 Hours`;
        }
        else if (TicketData.SLA === 3) {
            document.querySelector(".sla").innerHTML = `3 Days`;

        }
        else {
            document.querySelector(".sla").innerHTML = `${TicketData.SLA} Hours`;
        }
    }
    else {
        return null
    }
}


// Let's Fire it all 🔥

Followbutton.onclick = function () {
    getFollowUpDate();
    getTransferedDate();
    getClosedCode();
    getTicketTitle();
    GetProblemReason();
    CalculateDiffrence();
    filtterCode();
    checkReEsclation();
    validScript();
    displayData();
    displaySystemAction();
    addLinkEventListeners();
    displaySla();
}