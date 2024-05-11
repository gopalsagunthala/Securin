const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const weaknessSchema = new Schema({
    source:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: [
      {
        lang:{
            type: String,
            required: true
        },
        value:{
            type: String,
            required: true
        }
      }
    ]
  }
)
const cvssDataSchema = new Schema(
  {
    version:{
        type: String,
        required: true
    },
    vectorString:{
        type: String,
        required: true
    },
    accessVector: {
        type: String,
        required: true
    },
    accessComplexity: {
        type: String,
        required: true
    },
    authentication: {
        type: String,
        required: true
    },
    confidentialityImpact: {
        type: String,
        required: true
    },
    integrityImpact: {
        type: String,
        required: true
    },
    availabilityImpact: {
        type: String,
        required: true
    },
    baseScore: {
        type: Number,
        required: true
    }
  }
)
const cvssMetricV2Schema = new Schema({
  source:{
    type: String,
    required: true
},
  type:{
    type: String,
    required: true
},
  cvssData:cvssDataSchema,
  baseSeverity: {
    type: String,
    required: true
},
  exploitabilityScore: {
    type: String,
    required: true
},
  impactScore: {
    type: Number,
    required: true
},
  acInsufInfo: {
    type: Number,
    required: true
},
  obtainAllPrivilege: {
    type: Boolean,
    required: true
},
  obtainUserPrivilege: {
    type: Boolean,
    required: true
},
  obtainOtherPrivilege: {
    type: Boolean,
    required: true
},
  userInteractionRequired: {
    type: Boolean,
}
})
const VulnerabilitySchema = new mongoose.Schema({
    cve: {
        id: {
            type: String,
            required: true
        },
        sourceIdentifier: {
            type: String,
            required: true
        },
        published: {
            type: Date,
            required: true
        },
        lastModified: {
            type: Date,
            required: true
        },
        vulnStatus: String,
        descriptions: [
            {
                lang: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                }
            }
        ],
        metrics:{
          cvssMetricV2:[cvssMetricV2Schema]
        },
        weaknesses: [weaknessSchema],
        configurations: [
            {
                nodes: [
                    {
                        operator: {
                            type: String,
                            required: true
                        },
                        negate: {
                            type: Boolean,
                            required: true
                        },
                        cpeMatch: [
                            {
                                vulnerable: {
                                    type: Boolean,
                                    required: true
                                },
                                criteria: {
                                    type: String,
                                    required: true
                                },
                                matchCriteriaId:{
                                    type: String,
                                    required: true
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        references: [
            {
                url: {
                    type: String,
                    required: true
                },
                source: {
                    type: String,
                    required: true
                }
            }
        ]
    }
});


const Vulnerability = mongoose.model('Vulnerability', VulnerabilitySchema);

module.exports = Vulnerability;
