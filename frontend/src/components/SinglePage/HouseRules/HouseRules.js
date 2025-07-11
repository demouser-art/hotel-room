import React from 'react';
import { 
  ClockCircleOutlined, 
  UserDeleteOutlined, 
  SoundOutlined,
  SmokeFreeOutlined,
  HeartOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const HouseRulesWrapper = styled.div`
  margin-bottom: 40px;

  .rules-header {
    margin-bottom: 24px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .rule-category {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;

    .category-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;

      .category-icon {
        font-size: 20px;
        color: #1890ff;
      }
    }

    .rules-list {
      .rule-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 1.5;

        &:last-child {
          margin-bottom: 0;
        }

        .rule-icon {
          margin-top: 2px;
          color: #52c41a;
          font-size: 12px;
        }

        .rule-text {
          color: #333;
        }
      }
    }
  }

  .important-note {
    background: #fff2e8;
    border: 1px solid #ffd591;
    border-radius: 8px;
    padding: 16px;
    margin-top: 24px;

    .note-title {
      font-weight: 600;
      color: #d46b08;
      margin-bottom: 8px;
    }

    .note-text {
      color: #ad6800;
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

const HouseRules = () => {
  const rules = [
    {
      category: 'Check-in & Check-out',
      icon: <ClockCircleOutlined />,
      rules: [
        'Check-in: 3:00 PM - 11:00 PM',
        'Check-out: 11:00 AM',
        'Early check-in available upon request',
        'Late check-out may incur additional charges'
      ]
    },
    {
      category: 'Guest Policies',
      icon: <UserDeleteOutlined />,
      rules: [
        'Maximum occupancy as specified per room',
        'All guests must be registered at check-in',
        'Children under 12 stay free with parents',
        'Valid ID required for all guests'
      ]
    },
    {
      category: 'Property Guidelines',
      icon: <SafetyOutlined />,
      rules: [
        'No smoking anywhere on the property',
        'Quiet hours: 10:00 PM - 7:00 AM',
        'No parties or events without permission',
        'Respect other guests and property'
      ]
    },
    {
      category: 'Amenities & Services',
      icon: <HeartOutlined />,
      rules: [
        'Pool hours: 6:00 AM - 10:00 PM',
        'Gym access included for all guests',
        'Parking available (charges may apply)',
        'Housekeeping service daily'
      ]
    }
  ];

  return (
    <HouseRulesWrapper>
      <div className="rules-header">
        <h2>House Rules</h2>
        <p>Please review our policies to ensure a comfortable stay for everyone</p>
      </div>

      <div className="rules-grid">
        {rules.map((category, index) => (
          <div key={index} className="rule-category">
            <div className="category-title">
              <span className="category-icon">{category.icon}</span>
              <span>{category.category}</span>
            </div>
            
            <div className="rules-list">
              {category.rules.map((rule, ruleIndex) => (
                <div key={ruleIndex} className="rule-item">
                  <span className="rule-icon">•</span>
                  <span className="rule-text">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="important-note">
        <div className="note-title">Important Notice</div>
        <div className="note-text">
          Failure to comply with house rules may result in additional charges or termination of stay without refund. 
          For any questions or special requests, please contact our front desk staff who are available 24/7 to assist you.
        </div>
      </div>
    </HouseRulesWrapper>
  );
};

export default HouseRules;