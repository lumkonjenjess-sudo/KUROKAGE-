export const benefits = {

  Shadow: [

    "Access to KuroKage community"

  ],


  Bronze: [

    "5% member discount",

    "Early community updates"

  ],


  Silver: [

    "10% member discount",

    "Early product previews"

  ],


  Gold: [

    "15% member discount",

    "Priority product access"

  ],


  "Shadow Elite": [

    "25% member discount",

    "Exclusive product drops",

    "VIP early access"

  ]

};



export function getBenefits(
  tier
) {

  return benefits[tier] || [];

}
