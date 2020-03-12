import React, { Component } from 'react';
import { forwardRef } from 'react';
import './dealerManagement.scss'
import { dealerApplicationConfigurationService } from './../../services/dealerApplicationConfiguration'
import { DealerApplicationConfigurationModel } from './../../models/models'

import MaterialTable, { Column } from 'material-table';
import i18next from "i18next";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddEditDealerApplicationConfig from './addEditDealerApplicationConfig'

interface TableState {
  columns: Array<Column<DealerApplicationConfigurationModel>>;
  data: DealerApplicationConfigurationModel[];
}


export default function DealerManagement() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: i18next.t('DEALER_MANAGEMENT.DEALER_ID'), field: 'DealerId' },
      { title: i18next.t('DEALER_MANAGEMENT.APPLICATION'), field: 'Application' },
      { title: i18next.t('DEALER_MANAGEMENT.ALLOW_ACCESS'), field: 'AllowAccess' },
      { title: i18next.t('DEALER_MANAGEMENT.DEVICE_ID'), field: 'DeviceId' },
      { title: i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION'), field: 'DeviceDescription' },
      { title: i18next.t('DEALER_MANAGEMENT.EXPIRIED_DATE'), field: 'ExpiredDate' }
    ],
    data: [],
  });

  const [isShowModal, setShowModal] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState<DealerApplicationConfigurationModel>()

  const editRow = (dataRow: any) => {
    let mappingRow: DealerApplicationConfigurationModel = {
      DealerId: dataRow.dealerId,
      Application: dataRow.application,
      AllowAccess: dataRow.allowAccess,
      DeviceId: dataRow.deviceId,
      DeviceDescription: dataRow.deviceDescription,
      DealerApplicationConfigurationKey: dataRow.dealerApplicationConfigurationKey,
      ExpiredDate: dataRow.expiredDate
    }
    setSelectedRow(mappingRow)
    setShowModal(true);
  }

  const deleteRow = (dealerAppConfigKey: any) => {
    alert(dealerAppConfigKey)
  }

  const showModal = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AddEditDealerApplicationConfig Open={isShowModal} HandleClose={hideModal} DataObject={selectedRow}>
      </AddEditDealerApplicationConfig>
      <button type="button" onClick={showModal}>
        open
        </button>
      <MaterialTable
        title="Remote Data Preview"
        columns={[
          { title: 'Key', field: 'dealerApplicationConfigurationKey', hidden: true },
          { title: i18next.t('DEALER_MANAGEMENT.DEALER_ID'), field: 'dealerId' },
          { title: i18next.t('DEALER_MANAGEMENT.APPLICATION'), field: 'application' },
          { title: i18next.t('DEALER_MANAGEMENT.ALLOW_ACCESS'), field: 'allowAccess' },
          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_ID'), field: 'deviceId' },
          { title: i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION'), field: 'deviceDescription' },
          { title: i18next.t('DEALER_MANAGEMENT.EXPIRIED_DATE'), field: 'expiredDate' }
        ]}
        actions={[
          {
            icon: 'edit',
            tooltip: i18next.t('COMMON.EDIT'),
            onClick: (event, rowData) => editRow(rowData)
          },
          {
            icon: 'delete',
            tooltip: i18next.t('COMMON.DELETE'),
            onClick: (event, rowData) => deleteRow(rowData)
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        data={query =>
          new Promise((resolve, reject) => {
            dealerApplicationConfigurationService.getAll(query.page + 1, query.pageSize, "sort")
              .then(result => {
                resolve({
                  data: result.objectList,
                  page: query.page,
                  totalCount: result.totalItems
                })
              })
          })
        }
      />
    </div>

  )

}